'use strict';

const { port } = require("..");

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	const n = Object.create(null);
	if (e) {
		for (const k in e) {
			if (k !== 'default') {
				const d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		}
	}
	n["default"] = e;
	return Object.freeze(n);
}

async function newRustBackend() {
  let rustBackend = await (function (t) { return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(t)); }); })(`rubick_backend-${process.platform}`);
  console.log(rustBackend.asar_list)
  if (!!rustBackend.default) {
    rustBackend = rustBackend.default;
  }
  let that =this
  return {
    asarList: async (path) => {
      return await rustBackend.asar_list(path);
    },
    asarExtract: async (path, dest) => {
      return await rustBackend.asar_extract(path, dest);
    },
    asarExtractFile: async (path, dest) => {
      return await rustBackend.asar_extract_file(path, dest);
    },
    asarPack: async (path, dest, level) => {
      level = level || 0;
      if (level < 0)
        level = 0;
      if (level > 21)
        level = 21;
      return await rustBackend.asar_pack(path, dest, level);
    },
    captureAllToBase64: async () => {
      return await rustBackend.capture_all_base64_start();
    },
    ioioStart: async (port) => {
      if(port){
        rustBackend.ioio_start(port)
        return window.rubickAdapter
        
      }
    },
    ioioClose:()=>{
      rustBackend=undefined,
      that=undefined,
      setTimeout(()=>{
      },0)
    },
    captureToBase64: async () => {
      return await rustBackend.capture_base64_start();
    },
    screenColorPicker: async (position) => {
      return await rustBackend.screen_color_picker_start(position.x, position.y);
    },
    screenCaptureAroundPositionToBase64: async (position, width, height) => {
      return await rustBackend.screen_capture_rect_base64_start(position.x, position.y, width, height);
    },
    getInstalledApps: async (getDetailInfo, extraDirs) => {
      return await rustBackend.find_apps_start(getDetailInfo, extraDirs || []);
    },
    sendEvent: async (event) => {
      if (!event.device || !event.action || !event.info) {
        throw new Error("Not valid event!");
      }
      return await rustBackend.send_event_start(event.device, event.action, event.info);
    },
    language: async () => {
      return await rustBackend.current_locale_language();
    }
  };
}

module.exports = newRustBackend;
