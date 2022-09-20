const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/importStdMd", auth, apiProxy)
router.post("/importData", auth, apiProxy)
router.post("/importSY", auth, apiProxy)
module.exports=router