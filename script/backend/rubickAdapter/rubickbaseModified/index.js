'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
const os = require('os');
const Mali = require('mali');
const backend = require('./backend.js');
const grpcJs = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs-extra');
const utils = require('./utils.js');
const logger = require('./logger.js');
const event = require('./event.js');
const image = require('./image.js');
const worker = require('./worker.js');

function _interopDefaultLegacy(e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const os__default = /*#__PURE__*/_interopDefaultLegacy(os);
const Mali__default = /*#__PURE__*/_interopDefaultLegacy(Mali);
const fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

class RubickBase {
  constructor(settings) {
    this.cursorPosition = { x: 1, y: 1 };
    this.started = false;
    const { port, logger: logger$1, tmpdir, workerBoot, ioEventCallback } = settings;
    this.port = port || 50068;
    this.logger = logger$1 || logger.defaultLogger;
    this.tmpdir = tmpdir || os__default["default"].tmpdir();
    this.eventChannels = new event.EventChannelMap(this.logger);
    this.workerBoot = workerBoot !== void 0 ? workerBoot : true;
    this.ioEventCallback = ioEventCallback || ((_) => {
    });
  }
  async start() {
    if (this.started) {
      this.logger.error("Rubickbase has already started!");
      return;
    }
    this.port = this.port + Math.floor(Math.random() * 5) + 5
    this.port = await utils.tryPort(this.port);
    console.log(this.port)
    this.basicAPI = await this.getBasicAPI();
    this.server = new Mali__default["default"](await this.loadProto(), "Rubick");
    this.server.use("ioio", async (ctx) => {
      const event$1 = ctx.request.req;
      if (event$1.device === "Mouse" && event$1.action === "Move" && event$1.info.startsWith("{")) {
        event$1.info = JSON.parse(event$1.info);
      }
      event.deviceEventEmitter.emit("deviceEvent", event$1);
      ctx.res = { ok: true };
    });
    event.deviceEventEmitter.on("error", (err) => {
      this.logger.error(err);
    });
    event.deviceEventEmitter.on("deviceEvent", async (event) => {
      if (this.ioEventCallback)
        await this.ioEventCallback(event);
      if (event.device === "Mouse" && event.action === "Move") {
        this.cursorPosition = event.info;
      }
    });
    let that = this
    await this.server.start(`127.0.0.1:${this.port}`).then().catch(async e => {
      that.server.start(`127.0.0.1:${this.port + 1}`)
      if (that.workerBoot) {
        that.worker = await newRubickWorker({
          port: that.port + 1,
          logger: that.logger
        }).start();
      }
      that.started = true;


    })
    if (this.workerBoot) {
      this.worker = await newRubickWorker({
        port: this.port,
        logger: this.logger
      }).start();
    }
    this.started = true;
  }
  async close() {
    event.deviceEventEmitter.removeAllListeners();
    this.started = false;
    this.worker.close()
 /*  await this.server.close();
   this.server = undefined*/
  }
  async loadProto() {
    let proto = "./proto/rubick.proto";
    try {
      const protoJSON = await Promise.resolve().then(function () { return require('./proto/rubick.proto.js'); });
      proto = grpcJs.loadPackageDefinition(protoLoader.fromJSON(protoJSON));
      this.logger.info("You are in production mode, protoJSON loaded.");
    } catch {
    }
    return proto;
  }
  async tryBackend(func, errorReturn) {
    try {
      return await func();
    } catch (error) {
      this.logger.error(error);
      return errorReturn();
    }
  }
  async validAndTryBackend(func, errorReturn, dic = [], file = []) {
    if (typeof dic === "string") {
      dic = [dic];
    }
    if (typeof file === "string") {
      file = [file];
    }
    let v1 = dic.map((dic2) => fs__default["default"].existsSync(dic2) && fs__default["default"].lstatSync(dic2).isDirectory());
    let v2 = file.map((path) => fs__default["default"].existsSync(path) && fs__default["default"].lstatSync(path).isFile());
    let v = [...v1, ...v2];
    if (!v.includes(false)) {
      return await this.tryBackend(func, errorReturn);
    } else {
      this.logger.error("No such directory!");
      return errorReturn();
    }
  }
  colorError() {
    this.logger.error("Got an api color error!");
    return void 0;
  }
  imageError() {
    this.logger.error("Got an api image error!");
    return void 0;
  }
  appSearchError() {
    this.logger.error("Got an api app search error!");
    return void 0;
  }
  simulationError() {
    this.logger.error("Got an api simulation error!");
    return void 0;
  }
  getLanguageError() {
    this.logger.error("Got an api get language error!");
    return void 0;
  }
  asarError() {
    this.logger.error("Got an api asar error!");
    return void 0;
  }
  async getAPI() {
    if (!this.started)
      await this.start();
    const getCursorPosition = () => this.cursorPosition;
    const getCursorPositionPixelColor = async () => await this.tryBackend(async () => {
      const rgb = await this.rustBackend.screenColorPicker(getCursorPosition());
      return {
        hex16: utils.rgbToHex(rgb.r, rgb.g, rgb.b),
        rgba: {
          r: rgb.r,
          g: rgb.g,
          b: rgb.b,
          a: 255
        }
      };
    }, this.colorError);
    const setEventChannel = (bindEvent) => {
      const register = (name, hook) => {
        const registerHook = (hook2) => {
          const listener = async (deviceEvent) => {
            if (utils.eventEqual(deviceEvent, bindEvent))
              await hook2(deviceEvent);
          };
          this.eventChannels.set(name, listener);
          event.deviceEventEmitter.on("deviceEvent", listener);
        };
        registerHook(hook);
      };
      return register;
    };
    const allEventChannels = () => {
      return this.eventChannels.keys();
    };
    const hasEventChannel = (name) => {
      return this.eventChannels.has(name);
    };
    const delEventChannel = (name) => {
      if (this.eventChannels.has(name)) {
        const listener = this.eventChannels.get(name);
        if (listener)
          event.deviceEventEmitter.removeListener("deviceEvent", listener);
        this.eventChannels.delete(name);
      } else {
        this.logger.error(`no such handler: ${name}`);
      }
    };
    return {
      ...this.basicAPI,
      getCursorPosition,
      getCursorPositionPixelColor,
      setEventChannel,
      allEventChannels,
      hasEventChannel,
      delEventChannel
    };
  }
  async getBasicAPI() {
    this.rustBackend = await backend();
    const sendEvent = async (event) => await this.tryBackend(async () => await this.rustBackend.sendEvent(event), this.simulationError);
    const getInstalledApps = async (getDetailInfo = false, extraDirs) => await this.validAndTryBackend(async () => await this.rustBackend.getInstalledApps(getDetailInfo, extraDirs), this.appSearchError, extraDirs);
    const screenCapture = async () => await this.tryBackend(async () => {
      const imgBase64 = await this.rustBackend.captureToBase64();
      return image.newImageFromBase64(imgBase64);
    }, this.imageError);
    const screenCaptureAll = async () => await this.tryBackend(async () => {
      const captures = await this.rustBackend.captureAllToBase64();
      return captures.map((capture) => image.newImageFromBase64(capture));
    }, this.imageError);
    const screenCaptureAroundPosition = async (position, width, height) => await this.tryBackend(async () => {
      const imgBase64 = await this.rustBackend.screenCaptureAroundPositionToBase64(position, width, height);
      return image.newImageFromBase64(imgBase64);
    }, this.imageError);
    const asarList = async (path) => await this.validAndTryBackend(async () => await this.rustBackend.asarList(path), this.asarError, [], [path]);
    const asarExtract = async (path, dest) => await this.validAndTryBackend(async () => await this.rustBackend.asarExtract(path, dest), this.asarError, [], [path]);
    const asarExtractFile = async (path, dest) => await this.validAndTryBackend(async () => await this.rustBackend.asarExtractFile(path, dest), this.asarError, [], [path]);
    const asarPack = async (path, dest, level) => await this.validAndTryBackend(async () => await this.rustBackend.asarPack(path, dest, level), this.asarError, [path], []);
    const language = async () => await this.tryBackend(async () => await this.rustBackend.language(), this.getLanguageError);
    return {
      asarList,
      asarExtract,
      asarExtractFile,
      asarPack,
      screenCaptureAll,
      language,
      sendEvent,
      getInstalledApps,
      screenCapture,
      screenCaptureAroundPosition
    };
  }
}
const newRubickBase = (settings) => {
  return new RubickBase(settings || {});
};
const newRubickWorker = (settings) => {
  return new worker.RubickWorker(settings || {});
};

exports.RubickBase = RubickBase;
exports.newRubickBase = newRubickBase;
exports.newRubickWorker = newRubickWorker;
