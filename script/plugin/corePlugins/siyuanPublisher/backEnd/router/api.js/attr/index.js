router.post("/getBookmarkLabels", CheckAuth, getBookmarkLabels)
router.post("/resetBlockAttrs", CheckAuth, CheckReadonly, resetBlockAttrs)
router.post("/setBlockAttrs", CheckAuth, CheckReadonly, setBlockAttrs)
router.post("/getBlockAttrs", CheckAuth, getBlockAttrs)
