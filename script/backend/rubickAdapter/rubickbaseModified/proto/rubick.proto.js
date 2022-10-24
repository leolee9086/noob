'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nested = {
	rubick: {
		nested: {
			Rubick: {
				methods: {
					ioio: {
						requestType: "DeviceEvent",
						responseType: "OK"
					}
				}
			},
			DeviceEvent: {
				fields: {
					device: {
						type: "string",
						id: 1
					},
					action: {
						type: "string",
						id: 2
					},
					info: {
						type: "string",
						id: 3
					}
				}
			},
			OK: {
				fields: {
					ok: {
						type: "bool",
						id: 1
					}
				}
			}
		}
	}
};
const rubick = {
	nested: nested
};

exports["default"] = rubick;
exports.nested = nested;
