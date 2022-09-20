const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
const adminAuth =naive.middlewares.auth({user_group:'admin'})

router.post("/getBookmarkLabels", auth(), apiProxy)
router.post("/resetBlockAttrs", auth.apiAuth, apiProxy)
router.post("/setBlockAttrs", auth.apiAuth, apiProxy)
router.post("/getBlockAttrs", auth(), apiProxy)
module.exports=router