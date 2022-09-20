const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getFile", atuh(), apiProxy)
router.post("/putFile", atuh(), apiProxy)
router.post("/copyFile", atuh(), apiProxy)
module.exports=router