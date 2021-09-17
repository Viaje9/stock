const router = require("express").Router();
const IndexController = require("../controller/index");

router.get("/getStock", IndexController.getStock);
router.get("/getTMC", IndexController.getTMC);

module.exports = router