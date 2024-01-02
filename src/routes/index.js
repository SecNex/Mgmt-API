const router = require("express").Router();

router.use("/admin", require("./admin"));
router.use("/dns", require("./dns"));

module.exports = router;