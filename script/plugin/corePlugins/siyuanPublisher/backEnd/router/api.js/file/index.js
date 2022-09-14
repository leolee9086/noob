const express = require('express');
const router = express.Router();
const util = naive.serverUtil
const {CheckAuth} = util
router.post("/getFile", CheckAuth, getFile)
router.post("/putFile", CheckAuth, putFile)
router.post("/copyFile", CheckAuth, copyFile)
