const express = require('express');
const router = express.Router();
const formiable = require("express-formidable");
const path =require('path')
router.post("/putFile", (req, res) => {
    console.log(req);
    if (req.fields && req.fields.path) {
        if (req.files) {
            let filePath = path.join(naive.workspaceDir, req.fields.path);
            fs.renameSync(req.files.file.path, filePath);
            console.log(req.files);
            res.json({ data: null, msg: "上传文件成功" });
        }
    }
});
module.exports = router