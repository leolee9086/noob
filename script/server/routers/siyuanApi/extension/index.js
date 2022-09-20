const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/copy", auth, apiProxy)
module.exports=router