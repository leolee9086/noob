const express = require('express');
const router = express.Router();
const util = naive.serverUtil
const {CheckAuth} = util
router.post("/getBazaarWidget", CheckAuth, getBazaarWidget)
router.post("/getInstalledWidget", CheckAuth, getInstalledWidget)
router.post("/installBazaarWidget", CheckAuth, installBazaarWidget)
router.post("/uninstallBazaarWidget", CheckAuth, uninstallBazaarWidget)
router.post("/getBazaarIcon", CheckAuth, getBazaarIcon)
router.post("/getInstalledIcon", CheckAuth, getInstalledIcon)
router.post("/installBazaarIcon", CheckAuth, installBazaarIcon)
router.post("/uninstallBazaarIcon", CheckAuth, uninstallBazaarIcon)
router.post("/getBazaarTemplate", CheckAuth, getBazaarTemplate)
router.post("/getInstalledTemplate", CheckAuth, getInstalledTemplate)
router.post("/installBazaarTemplate", CheckAuth, installBazaarTemplate)
router.post("/uninstallBazaarTemplate", CheckAuth, uninstallBazaarTemplate)
router.post("/getBazaarTheme", CheckAuth, getBazaarTheme)
router.post("/getInstalledTheme", CheckAuth, getInstalledTheme)
router.post("/installBazaarTheme", CheckAuth, installBazaarTheme)
router.post("/uninstallBazaarTheme", CheckAuth, uninstallBazaarTheme)
router.post("/getBazaarPackageREAME", CheckAuth, getBazaarPackageREAME)
