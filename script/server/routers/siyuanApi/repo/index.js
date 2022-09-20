const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/InitRepoKeyFromPassphrase", auth(), apiProxy)
router.post("/initRepoKey", auth(), apiProxy)
router.post("/resetRepo", auth(), apiProxy)
router.post("/importRepoKey", auth(), apiProxy)
router.post("/createSnapshot", auth(), apiProxy)
router.post("/tagSnapshot", auth(), apiProxy)
router.post("/checkoutRepo", auth(), apiProxy)
router.post("/getRepoSnapshots", auth(), apiProxy)
router.post("/getRepoTagSnapshots", auth(), apiProxy)
router.post("/removeRepoTagSnapshot", auth(), apiProxy)
router.post("/getCloudRepoTagSnapshots", auth(), apiProxy)
router.post("/removeCloudRepoTagSnapshot", auth(), apiProxy)
router.post("/uploadCloudSnapshot", auth(), apiProxy)
router.post("/downloadCloudSnapshot", auth(), apiProxy)
module.exports=router