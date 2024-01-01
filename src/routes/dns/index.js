const router = require("express").Router();

router.use("/domain", require("./domain"));

module.exports = router;