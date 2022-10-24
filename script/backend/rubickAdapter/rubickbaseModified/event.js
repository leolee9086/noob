'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const events = require('events');

class DeviceEventEmitter extends events.EventEmitter {
}
class EventChannelMap extends Map {
  constructor(logger) {
    super();
    this.logger = logger;
  }
  set(key, value) {
    this.logger.info(`A new event channel [${key}] hooked`);
    return super.set(key, value);
  }
  delete(key) {
    this.logger.info(`Event channel [${key}] unhooked`);
    return super.delete(key);
  }
}
const deviceEventEmitter = new DeviceEventEmitter({ captureRejections: true });

exports.EventChannelMap = EventChannelMap;
exports.deviceEventEmitter = deviceEventEmitter;
