const express = require('express');
const router = express.Router();
const fs = require('fs-extra')
naive.unAuthedPageTemplate = {
    private: (() => {
        return fs.readFileSync(
            naive.pathConstructor.templatePath() + "/private.html",
            "utf8"
        );
    })(),
    protected: (() => {
        return fs.readFileSync(
            naive.pathConstructor.templatePath() + "/unAuthedPage.html",
            "utf8"
        );

    })()
}
router.get("/protected", (req, res) => {
    res.end(unAuthedPageTemplate.protected);
})
router.get("/private", (req, res) => {
    res.end(unAuthedPageTemplate.private);
})
module.exports = router