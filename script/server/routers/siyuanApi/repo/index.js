const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/InitRepoKeyFromPassphrase", atuh(), apiProxy)
router.post("/initRepoKey", atuh(), apiProxy)
router.post("/resetRepo", atuh(), apiProxy)
router.post("/importRepoKey", atuh(), apiProxy)
router.post("/createSnapshot", atuh(), apiProxy)
router.post("/tagSnapshot", atuh(), apiProxy)
router.post("/checkoutRepo", atuh(), apiProxy)
router.post("/getRepoSnapshots", atuh(), apiProxy)
router.post("/getRepoTagSnapshots", atuh(), apiProxy)
router.post("/removeRepoTagSnapshot", atuh(), apiProxy)
router.post("/getCloudRepoTagSnapshots", atuh(), apiProxy)
router.post("/removeCloudRepoTagSnapshot", atuh(), apiProxy)
router.post("/uploadCloudSnapshot", atuh(), apiProxy)
router.post("/downloadCloudSnapshot", atuh(), apiProxy)
module.exports=router