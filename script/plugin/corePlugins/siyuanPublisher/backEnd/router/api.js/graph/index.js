router.post("/resetGraph", CheckAuth, resetGraph)
router.post("/resetLocalGraph", CheckAuth, resetLocalGraph)
router.post("/getGraph", CheckAuth, getGraph)
router.post("/getLocalGraph", CheckAuth, getLocalGraph)
