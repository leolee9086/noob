const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/reshBacklink", auth, apiProxy)
router.post("/getBacklink", auth, apiProxy)
router.post("/createBacklink", auth, apiProxy)
module.exports=router