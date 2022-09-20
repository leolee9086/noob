const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post( "/pushMsg", atuh(), apiProxy)
router.post( "/pushErrMsg", atuh(), apiProxy)

module.exports=router