const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/getBazaarWidget", atuh(), apiProxy)
router.post("/getInstalledWidget", atuh(), apiProxy)
router.post("/installBazaarWidget", atuh(), apiProxy)
router.post("/uninstallBazaarWidget", atuh(), apiProxy)
router.post("/getBazaarIcon", atuh(), apiProxy)
router.post("/getInstalledIcon", atuh(), apiProxy)
router.post("/installBazaarIcon", atuh(), apiProxy)
router.post("/uninstallBazaarIcon", atuh(), apiProxy)
router.post("/getBazaarTemplate", atuh(), apiProxy)
router.post("/getInstalledTemplate", atuh(), apiProxy)
router.post("/installBazaarTemplate", atuh(), apiProxy)
router.post("/uninstallBazaarTemplate", atuh(), apiProxy)
router.post("/getBazaarTheme", atuh(), apiProxy)
router.post("/getInstalledTheme", atuh(), apiProxy)
router.post("/installBazaarTheme", atuh(), apiProxy)
router.post("/uninstallBazaarTheme", atuh(), apiProxy)
router.post("/getBazaarPackageREAME", atuh(), apiProxy)
module.exports=router