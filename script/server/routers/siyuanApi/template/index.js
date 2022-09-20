const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/render", auth(), apiProxy)
router.post("/docSaveAsTemplate", auth(), apiProxy)
module.exports=router