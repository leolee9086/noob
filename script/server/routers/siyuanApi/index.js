const express = require('express');
const router = express.Router();
const util = naive.serverUtil
const { CheckAuth, describeApi } = util
const { middlewares } = naive
const { auth, syProxy } = middlewares
const { apiProxy } = syProxy



module.exports = router