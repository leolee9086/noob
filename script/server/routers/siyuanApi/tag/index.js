const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getTag", auth, apiProxy)
router.post("/renameTag", auth, apiProxy)
router.post("/removeTag", auth, apiProxy)
module.exports=router