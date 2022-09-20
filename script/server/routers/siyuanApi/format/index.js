const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/autoSpace", auth(), apiProxy)
router.post("/netImg2LocalAssets", auth(), apiProxy)
module.exports=router