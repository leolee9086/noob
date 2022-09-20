const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getTag", atuh(), apiProxy)
router.post("/renameTag", atuh(), apiProxy)
router.post("/removeTag", atuh(), apiProxy)
module.exports=router