'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
 
const fs = require('fs-extra');
//const photonNode = requireInstall('@silvia-odwyer/photon-node');
const utils = require('./utils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

class Image {
  constructor(photonImage) {
    this.photonImage = photonImage;
  }
  toBase64() {
    return this.photonImage.get_base64();
  }
  get width() {
    return this.photonImage.get_width();
  }
  get height() {
    return this.photonImage.get_height();
  }
  async save(path) {
    let output_base64 = this.photonImage.get_base64();
    const output_data = output_base64.replace(/^data:image\/\w+;base64,/, "");
    await fs__default["default"].writeFile(path, output_data, { encoding: "base64" });
  }
  resize(width, height, sampling_filter) {
    sampling_filter = sampling_filter || 1;
    //const img = photonNode.resize(this.photonImage, width, height, sampling_filter);
    return new Image(img);
  }
  getRawPixel() {
    return this.photonImage.get_raw_pixels();
  }
  crop(leftTopPosition, width, height) {
    const [w, h] = [this.width, this.height];
    const limitValue = (value, min, max) => {
      if (value < min) {
        value = min;
      }
      if (value > max) {
        value = max;
      }
      return value;
    };
    leftTopPosition.x = limitValue(leftTopPosition.x, 0, w);
    leftTopPosition.y = limitValue(leftTopPosition.y, 0, h);
    width = limitValue(width, 0, w - width);
    height = limitValue(height, 0, h - height);
    return new Image(photonNode.crop(this.photonImage, leftTopPosition.x, leftTopPosition.y, width, height));
  }
  colorAt(position) {
    if (0 < position.x && position.x <= this.width && 0 < position.y && position.y <= this.height) {
      const strip = 4 * (this.width * (position.y - 1) + position.x);
      const color = this.getRawPixel().slice(strip - 4, strip);
      return {
        hex16: utils.rgbToHex(color[0], color[1], color[2], color[3]),
        rgba: {
          r: color[0],
          g: color[1],
          b: color[2],
          a: color[3]
        }
      };
    } else {
      throw new Error("position out of bounds!");
    }
  }
}
const newImageFromFile = async (path) => {
  let base64 = await fs__default["default"].readFile(path, { encoding: "base64" });
  const data = base64.replace(/^data:image\/(png|jpg);base64,/, "");
  try {
    const img = photonNode.PhotonImage.new_from_base64(data);
    return new Image(img);
  } catch (error) {
    throw error;
  }
};
const newImageFromBase64 = (base64) => {
  if (base64 === "error") {
    throw new Error("error image");
  }
  const data = base64.replace(/^data:image\/(png|jpg);base64,/, "");
  try {
    const img = photonNode.PhotonImage.new_from_base64(data);
    return new Image(img);
  } catch (error) {
    throw error;
  }
};

exports.Image = Image;
exports.newImageFromBase64 = newImageFromBase64;
exports.newImageFromFile = newImageFromFile;
