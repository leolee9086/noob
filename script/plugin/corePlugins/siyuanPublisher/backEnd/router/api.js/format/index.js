const express = require('express');
const router = express.Router();
const util = naive.serverUtil
const {CheckAuth} = util

router.post("/autoSpace", CheckAuth, CheckReadonly, autoSpace)
router.post("/netImg2LocalAssets", CheckAuth, CheckReadonly, netImg2LocalAssets)
