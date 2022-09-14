router.post("/importStdMd", CheckAuth, CheckReadonly, importStdMd)
router.post("/importData", CheckAuth, CheckReadonly, importData)
router.post("/importSY", CheckAuth, CheckReadonly, importSY)
