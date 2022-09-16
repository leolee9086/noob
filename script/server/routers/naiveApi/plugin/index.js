const express = require('express');
const router = express.Router();
const formiable = require("express-formidable");
const path =require('path')
const {checkFileAccess} = require("../../../middleWares/index.js")
router.use("/getPluginStatus", (req, res) => {
    res.setHeader("Access-Control-Allow-Private-Network", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (naive.publishOption.提供插件服务) {
        res.json(
            {
                msg: 0,
                data: JSON.parse(naive.pluginStatus)
            }
        )
    }
    else {
        res.json({
            msg: 1,
            data: null,
            error: "抱歉,站点拥有者未开放插件分享服务"
        })
    }
});
router.use("/getPlugin", async (req, res) => {
    res.setHeader("Access-Control-Allow-Private-Network", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.body && naive.publishOption.提供插件服务) {
        let { name } = req.body
        await naive.compressing.zip.compressDir(naive.pathConstructor.pluginsPath() + `\\${name}`, naive.pathConstructor.downloadCachePath() + `\\${name}.zip`)
        res.sendFile(naive.pathConstructor.downloadCachePath() + `\\${name}.zip`)
    }
    else {
        res.json({
            msg: 1,
            data: null,
            error: "抱歉,站点拥有者未开放插件分享服务"
        })
    }
})
router.use("/getConfig", checkFileAccess,(req, res) => {
    res.end(JSON.stringify(naive.pluginsConfig));
});
router.post("/setConfig", (req, res) => {
    let json = req.body
    fs.writeFileSync(naive.pathConstructor.pluginsConfigPath,JSON.stringify(json.data))
});
router.use("/corePluginsList", (req, res) => {
    res.json(naive.corePluginsList);
});
router.post("/corePlugins", (req, res) => {
    res.end(JSON.stringify(naive.corePlugins));
});
module.exports=router