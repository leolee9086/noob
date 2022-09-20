const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/resetGraph", auth(), apiProxy)
router.post("/resetLocalGraph", auth(), apiProxy)
router.post("/getGraph", auth(), apiProxy)
router.post("/getLocalGraph", auth(), apiProxy)
module.exports=router