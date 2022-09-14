router.post("/render", CheckAuth, renderTemplate)
router.post("/docSaveAsTemplate", CheckAuth, docSaveAsTemplate)
