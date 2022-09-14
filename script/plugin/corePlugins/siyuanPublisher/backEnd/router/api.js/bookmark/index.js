router.post("/getBookmark", CheckAuth, getBookmark)
router.post("/renameBookmark", CheckAuth, renameBookmark)
router.post("/removeBookmark", CheckAuth, removeBookmark)
