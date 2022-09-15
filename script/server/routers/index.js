const express =require("express")
const router = express.Router();
router.use('/naiveApi/',require("./naiveApi/index.js"))
module.exports = router