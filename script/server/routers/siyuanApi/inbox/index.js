const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getShorthands", atuh(), apiProxy)
router.post("/removeShorthands", atuh(), apiProxy)
module.exports=router