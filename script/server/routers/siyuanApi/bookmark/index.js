const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getBookmark", atuh(), apiProxy)
router.post("/renameBookmark", atuh(), apiProxy)
router.post("/removeBookmark", atuh(), apiProxy)
module.exports=router