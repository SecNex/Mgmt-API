const router = require("express").Router();

const { DNS } = require("../../models");

router.get("/", async (req, res) => {
    const domains = await DNS.Domain.findAll({
        include: [
            {
                model: DNS.Record,
                as: "records",
            },
        ],
    });
    return await res.status(200).json({
        status: "success",
        message: "Successfully retrieved domains.",
        data: domains,
    });
});

router.get("/:id", async (req, res) => {
    const domain = await DNS.Domain.findByPk(req.params.id, {
        include: [
            {
                model: DNS.Record,
                as: "records",
            },
        ],
    });
    if (!domain) {
        return await res.status(404).json({
            status: "error",
            message: "Domain not found!",
        });
    }
    return await res.status(200).json({
        status: "success",
        message: "Successfully retrieved domain.",
        data: domain,
    });
});

module.exports = router;