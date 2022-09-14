router.post("/pushMsg", CheckAuth, pushMsg)
router.post("/pushErrMsg", CheckAuth, pushErrMsg)
