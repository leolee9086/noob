const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getShorthands", auth(), apiProxy)
router.post("/removeShorthands", auth(), apiProxy)
module.exports=router