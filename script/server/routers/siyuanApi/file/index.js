const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getFile", auth(), apiProxy)
router.post("/putFile", auth(), apiProxy)
router.post("/copyFile", auth(), apiProxy)
module.exports=router