const router = require("express").Router();
const IndexController = require("../controller/index");

router.get("/getIS", IndexController.getIS);
router.get("/getTMC", IndexController.getTMC);
router.get("/getMenu", IndexController.getMenu);


module.exports = router