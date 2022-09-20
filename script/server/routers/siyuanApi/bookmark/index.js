const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getBookmark", auth, apiProxy)
router.post("/renameBookmark", auth, apiProxy)
router.post("/removeBookmark", auth, apiProxy)
module.exports=router