const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/getBazaarWidget", auth, apiProxy)
router.post("/getInstalledWidget", auth, apiProxy)
router.post("/installBazaarWidget", auth, apiProxy)
router.post("/uninstallBazaarWidget", auth, apiProxy)
router.post("/getBazaarIcon", auth, apiProxy)
router.post("/getInstalledIcon", auth, apiProxy)
router.post("/installBazaarIcon", auth, apiProxy)
router.post("/uninstallBazaarIcon", auth, apiProxy)
router.post("/getBazaarTemplate", auth, apiProxy)
router.post("/getInstalledTemplate", auth, apiProxy)
router.post("/installBazaarTemplate", auth, apiProxy)
router.post("/uninstallBazaarTemplate", auth, apiProxy)
router.post("/getBazaarTheme", auth, apiProxy)
router.post("/getInstalledTheme", auth, apiProxy)
router.post("/installBazaarTheme", auth, apiProxy)
router.post("/uninstallBazaarTheme", auth, apiProxy)
router.post("/getBazaarPackageREAME", auth, apiProxy)
module.exports=router