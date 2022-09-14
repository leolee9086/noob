router.post("/getTag", CheckAuth, getTag)
router.post("/renameTag", CheckAuth, renameTag)
router.post("/removeTag", CheckAuth, removeTag)
