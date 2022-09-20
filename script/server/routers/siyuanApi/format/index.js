const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/autoSpace", atuh(), apiProxy)
router.post("/netImg2LocalAssets", atuh(), apiProxy)
module.exports=router