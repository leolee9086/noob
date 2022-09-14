const express = require('express');
const router = express.Router();
const util = naive.serverUtil
const {CheckAuth} = util

router.post("/InitRepoKeyFromPassphrase", CheckAuth, initRepoKeyFromPassphrase)
router.post("/initRepoKey", CheckAuth, initRepoKey)
router.post("/resetRepo", CheckAuth, resetRepo)
router.post("/importRepoKey", CheckAuth, importRepoKey)
router.post("/createSnapshot", CheckAuth, createSnapshot)
router.post("/tagSnapshot", CheckAuth, tagSnapshot)
router.post("/checkoutRepo", CheckAuth, checkoutRepo)
router.post("/getRepoSnapshots", CheckAuth, getRepoSnapshots)
router.post("/getRepoTagSnapshots", CheckAuth, getRepoTagSnapshots)
router.post("/removeRepoTagSnapshot", CheckAuth, removeRepoTagSnapshot)
router.post("/getCloudRepoTagSnapshots", CheckAuth, getCloudRepoTagSnapshots)
router.post("/removeCloudRepoTagSnapshot", CheckAuth, removeCloudRepoTagSnapshot)
router.post("/uploadCloudSnapshot", CheckAuth, uploadCloudSnapshot)
router.post("/downloadCloudSnapshot", CheckAuth, downloadCloudSnapshot)
