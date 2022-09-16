const express = require('express');
const router = express.Router();
const fs = require('fs-extra')
router.get('/regist', (req, res) => {
    let unAuthedPageTemplate = this.fs.readFileSync(
        naive.pathConstructor.templatePath() + "/login.html",
        "utf8"
    );
    let adminPageTemplate = this.fs.readFileSync(naive.pathConstructor.templatePath() + '/admin.html', 'utf8')

    if (naive.dbNoUser) {
        res.end(adminPageTemplate)
    }
    else res.end(unAuthedPageTemplate);
    console.log(res);
});
router.get("/login", async (req, res) => {
    let loginPageTemplate = fs.readFileSync(naive.pathConstructor.templatePath() + '/unAuthedPage.html', 'utf8')
    let adminPageTemplate = fs.readFileSync(naive.pathConstructor.templatePath() + '/admin.html', 'utf8')
    if (naive.dbNoUser) {
        res.end(adminPageTemplate)
    }
    else {
        res.end(loginPageTemplate)
    }
})  
module.exports =router