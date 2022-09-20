const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/setSyncEnable", atuh(), apiProxy)
router.post("/setSyncMode", atuh(), apiProxy)
router.post("/setCloudSyncDir", atuh(), apiProxy)
router.post("/createCloudSyncDir", atuh(), apiProxy)
router.post("/removeCloudSyncDir", atuh(), apiProxy)
router.post("/listCloudSyncDir", atuh(), apiProxy)
router.post("/performSync", atuh(), apiProxy)
router.post("/performBootSync", atuh(), apiProxy)
router.post("/getBootSync", atuh(), apiProxy)
module.exports=router