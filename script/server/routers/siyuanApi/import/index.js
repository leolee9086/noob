const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/importStdMd", atuh(), apiProxy)
router.post("/importData", atuh(), apiProxy)
router.post("/importSY", atuh(), apiProxy)
module.exports=router