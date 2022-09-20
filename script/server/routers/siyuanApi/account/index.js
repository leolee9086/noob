const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/login", auth, apiProxy)
router.post("/checkActivationcode", auth, apiProxy)
router.post("/useActivationcode", auth, apiProxy)
router.post("/deactivate", auth, apiProxy)
router.post("/startFreeTrial", auth, apiProxy)
module.exports=router