const router = require("express").Router();
const IndexController = require("../controller/index");

router.get("/getIS", IndexController.getIS);
router.get("/getTMC", IndexController.getTMC);

module.exports = router