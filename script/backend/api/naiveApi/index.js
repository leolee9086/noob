
const express = require('express');
const router = express.Router();
const formiable = require("express-formidable");
const fileRouter =require("./file/index.js")
const system =require("./system/index.js")
const user =require("./user/index.js")
const plugin =require("./plugin/index.js")
router.use("/plugin/",plugin)
router.use("/system",system)
router.use("/user",user)
router.post("/getPublishOption", (req, res) => {
    res.setHeader("Access-Control-Allow-Private-Network", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(JSON.stringify(realoption));
});
router.get("/getPublishOption", (req, res) => {
    res.setHeader("Access-Control-Allow-Private-Network", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(JSON.stringify(naive.publishOption));
});

router.post("/updatecache", async (req, res) => {
    let data = req.postbody.data;
    let id = data.id;
    this.更新缓存(id, content, naive.workspaceDir);
    res.send({ id: data.id });
});
router.use(
    "/file/*",
    formiable({
        encoding: "utf-8",
        uploadDir: naive.pathConstructor.uploadCachePath(),
        multiples: true,
    }),fileRouter
);

module.exports = router