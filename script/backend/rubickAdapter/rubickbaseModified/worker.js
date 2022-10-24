'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const backend = require('./backend.js');
const logger = require('./logger.js');

class RubickWorker {
  constructor(workerSettings) {
    this.log = (success, name) => {
      if (success) {
        this.logger.log(`Start ${name} worker`);
      } else {
        this.logger.error(`Start ${name} worker`);
      }
    };
    const { port, logger: logger$1 } = workerSettings;
    this.port = port || 50068;
    this.logger = logger$1 || logger.defaultLogger;
    this.started = false;
  }
  async start(workerName) {
    var _a, _b;
    if (!this.started) {
      this.rustBackend = await backend();
      this.started = true;
    }
    
    this.rustBackend.ioioStart(this.port.toString(),"ioio")
    return this

  //  if (workerName) {
     // switch (workerName) {
      //  case "ioio":
         // this.log(await ((_a = this.rustBackend) == null ? void 0 : _a.ioioStart(this.port.toString())), "ioio");
         // break;
      //}
   //} else {
      //this.log(await ((_b = this.rustBackend) == null ? void 0 : _b.ioioStart(this.port.toString())), "ioio");
   //}
   }
   async close(){
    await this.rustBackend.ioioClose()
    this.started = true;

   }
}

exports.RubickWorker = RubickWorker;
