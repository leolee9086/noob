const express = require('express');
const router = express.Router();
const fs = require('fs-extra')
router.get('/regist', (req, res) => {
    let unAuthedPageTemplate = fs.readFileSync(
        naive.pathConstructor.templatePath() + "/login.html",
        "utf8"
    );
    let adminPageTemplate = fs.readFileSync(naive.pathConstructor.templatePath() + '/admin.html', 'utf8')

    if (naive.dbNoUser) {
    console.log(req.headers)
    if(req.headers.host=='127.0.0.1'||req.headers.host=='localhost')   
    {res.end(adminPageTemplate)}
    else{
        adminPageTemplate = fs.readFileSync(naive.pathConstructor.templatePath() + '/adminNotLocal.html', 'utf8')
        res.end(adminPageTemplate)
    }
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
router.get("/logout", async (req, res) => {
    req.session.user=''
    req.session.user_group=''
    req.session.status=''
    res.redirect('/')
})  
router.post("/logout", async (req, res) => {
    req.session.user=''
    req.session.user_group=''
    req.session.status=''
    res.redirect('/')

}) 

module.exports =router