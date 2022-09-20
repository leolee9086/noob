const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/resetGraph", atuh(), apiProxy)
router.post("/resetLocalGraph", atuh(), apiProxy)
router.post("/getGraph", atuh(), apiProxy)
router.post("/getLocalGraph", atuh(), apiProxy)
module.exports=router