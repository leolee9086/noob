const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/setSyncEnable", auth(), apiProxy)
router.post("/setSyncMode", auth(), apiProxy)
router.post("/setCloudSyncDir", auth(), apiProxy)
router.post("/createCloudSyncDir", auth(), apiProxy)
router.post("/removeCloudSyncDir", auth(), apiProxy)
router.post("/listCloudSyncDir", auth(), apiProxy)
router.post("/performSync", auth(), apiProxy)
router.post("/performBootSync", auth(), apiProxy)
router.post("/getBootSync", auth(), apiProxy)
module.exports=router