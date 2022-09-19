const express= naive.express
const router = express.Router()
import publish from "./publish/index.js"
router.use("/publish", (req, res) => publish);
module.exports= router
	