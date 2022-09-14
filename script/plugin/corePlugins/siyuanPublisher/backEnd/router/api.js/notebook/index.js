const express = require('express');
const router = express.Router();
const util = naive.serverUtil
const {CheckAuth} = util
router.post("/lsNotebooks", CheckAuth, lsNotebooks)
router.post("/openNotebook", CheckAuth, openNotebook)
router.post("/closeNotebook", CheckAuth, closeNotebook)
router.post("/getNotebookConf", CheckAuth, getNotebookConf)
router.post("/setNotebookConf", CheckAuth, setNotebookConf)
router.post("/createNotebook", CheckAuth, createNotebook)
router.post("/removeNotebook", CheckAuth, removeNotebook)
router.post("/renameNotebook", CheckAuth, renameNotebook)
router.post("/changeSortNotebook", CheckAuth, changeSortNotebook)
router.post("/setNotebookIcon", CheckAuth, setNotebookIcon)
