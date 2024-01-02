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

router.post("/", async (req, res) => {
    const { name, description } = req.body;
    var domain;
    if (!name || !description) {
        return await res.status(400).json({
            status: "error",
            message: "Missing required fields!",
        });
    }
    try {
        domain = await DNS.Domain.create({
            name,
            description,
        });
    } catch (error) {
        console.log(error);
        if (error.name === "SequelizeUniqueConstraintError") {
            return await res.status(409).json({
                status: "error",
                message: "Domain already exists!",
            });
        }
        return await res.status(500).json({
            status: "error",
            message: "Internal server error!",
        });
    }
    return await res.status(201).json({
        status: "success",
        message: "Successfully created domain.",
        data: domain,
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

router.delete("/:id", async (req, res) => {
    const domain = await DNS.Domain.findByPk(req.params.id);
    if (!domain) {
        return await res.status(404).json({
            status: "error",
            message: "Domain not found!",
        });
    }
    try {
        await domain.destroy();
    } catch (error) {
        return await res.status(500).json({
            status: "error",
            message: "Internal server error!",
        });
    }
    return await res.status(200).json({
        status: "success",
        message: "Successfully deleted domain.",
    });
});

module.exports = router;