const crypto = require("crypto");
const JSEncrypt = require("JSEncrypt");
let jsEncrypt = new JSEncrypt();
const fs = require("fs-extra");

const initKeyPair = function () {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 1024,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
        //       cipher: 'aes-256-cbc',
        //         passphrase:'top secret'
      },
    });
    naive.pathConstructor.initFilep(
      naive.workspaceDir + `\\conf\\naiveConf\\privateKey.pem`,
      privateKey
    );
    naive.pathConstructor.initFilep(
      naive.workspaceDir + `\\conf\\naiveConf\\publicKey.pem`,
      publicKey
    );
  };
  initKeyPair();
let rsaPublicKey = fs
  .readFileSync(naive.workspaceDir + `\\conf\\naiveConf\\publicKey.pem`)
  .toString("ascii");
let rsaPrivateKey = fs
  .readFileSync(naive.workspaceDir + `\\conf\\naiveConf\\privateKey.pem`)
  .toString("ascii");
  jsEncrypt.setPublicKey(rsaPublicKey);
  let str = jsEncrypt.encrypt("测试");
  jsEncrypt.setPrivateKey(rsaPrivateKey);
  console.log(jsEncrypt.decrypt(str));
module.exports={
    jsEncrypt:jsEncrypt,
    rsaPublicKey:rsaPublicKey,
    rsaPrivateKey:rsaPrivateKey
}