'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const logger = require('./logger.js');
const net = require('net');

const rgbToHex = (red, green, blue, alpha) => {
  alpha = alpha || 1;
  if (red > 255 || green > 255 || blue > 255) {
    logger.defaultLogger.error("Expected three numbers below 256");
  }
  if (alpha >= 0 && alpha <= 1) {
    alpha = Math.round(255 * alpha);
  }
  return "#" + ((blue | green << 8 | red << 16 | 1 << 24).toString(16).slice(1) + (alpha | 1 << 8).toString(16).slice(1)).toUpperCase();
};
const infoEqual = (a, b) => typeof a === "string" || typeof b === "string" || typeof a === "number" || typeof b === "number" ? a === b : (a == null ? void 0 : a.x) === b.x && (a == null ? void 0 : a.y) === b.y;
const eventEqual = (deviceEvent, bindEvent) => (bindEvent.device ? deviceEvent.device === bindEvent.device : true) && (bindEvent.action ? deviceEvent.action === bindEvent.action : true) && (bindEvent.info ? infoEqual(deviceEvent.info, bindEvent.info) : true);
const tryPort = (port) => {
  const server = net.createServer().listen(port);
  return new Promise((resolve, reject) => {
    server.on("listening", () => {
      server.close();
      resolve(port);
    });
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(tryPort(port + 1));
        console.warn(`The port ${port} is occupied try another.`);
      } else {
        reject(err);
      }
    });
  });
};

exports.eventEqual = eventEqual;
exports.rgbToHex = rgbToHex;
exports.tryPort = tryPort;
