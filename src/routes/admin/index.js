const router = require("express").Router();

router.use("/org", require("./org"));

module.exports = router;