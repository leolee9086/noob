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
naive.serverUtil.describeJSONApi('/naiveApi/file/putFile', {
    名称: '获取文档大纲',
    功能: '获取文档大纲',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'ouline'
})

module.exports = router