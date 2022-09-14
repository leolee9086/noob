const express = require('express');
const router = express.Router();
const formiable = require("express-formidable");
const path =require('path')
const {CheckAuth} = util

router.post("/login", CheckAuth, login)
router.post("/checkActivationcode", CheckAuth, checkActivationcode)
router.post("/useActivationcode", CheckAuth, useActivationcode)
router.post("/deactivate", CheckAuth, deactivateUser)
router.post("/startFreeTrial", CheckAuth, startFreeTrial)
