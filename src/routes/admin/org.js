const router = require("express").Router();

const models = require("../../models");

router.get("/", async (req, res) => {
    const orgs = await models.Core.Organization.findAll();
    return await res.status(200).json({
        status: "success",
        message: "Successfully retrieved orgs.",
        data: orgs,
    });
});

router.post("/", async (req, res) => {
    const { name, description } = req.body;
    var org;
    if (!name || !description) {
        return await res.status(400).json({
            status: "error",
            message: "Missing required fields!",
        });
    }
    try {
        org = await models.Core.Organization.create({
            name,
            description,
        });
    } catch (error) {
        console.log(error);
        if (error.name === "SequelizeUniqueConstraintError") {
            return await res.status(409).json({
                status: "error",
                message: "Org already exists!",
            });
        }
        return await res.status(500).json({
            status: "error",
            message: "Internal server error!",
        });
    }
    return await res.status(201).json({
        status: "success",
        message: "Successfully created org.",
        data: org,
    });
});

router.get("/:id", async (req, res) => {
    const org = await models.Core.Organization.findByPk(req.params.id, {
        include: [
            {
                model: models.Core.Team,
                as: "teams",
                include: [
                    {
                        model: models.Core.User,
                        as: "users",
                    },
                ],
            },
        ],
    });
    if (!org) {
        return await res.status(404).json({
            status: "error",
            message: "Org not found!",
        });
    }
    return await res.status(200).json({
        status: "success",
        message: "Successfully retrieved org.",
        data: org,
    });
});

router.post("/:id/team", async (req, res) => {
    const { name, description } = req.body;
    var org;
    var team;
    if (!name || !description) {
        return await res.status(400).json({
            status: "error",
            message: "Missing required fields!",
        });
    }
    try {
        org = await models.Core.Organization.findByPk(req.params.id);
        if (!org) {
            return await res.status(404).json({
                status: "error",
                message: "Org not found!",
            });
        }
        team = await models.Core.Team.create({
            name,
            description,
            organizationId: org.id,
        });
    } catch (error) {
        console.log(error);
        if (error.name === "SequelizeUniqueConstraintError") {
            return await res.status(409).json({
                status: "error",
                message: "Team already exists!",
            });
        }
        return await res.status(500).json({
            status: "error",
            message: "Internal server error!",
        });
    }
    return await res.status(201).json({
        status: "success",
        message: "Successfully created team.",
        data: team,
    });
});

module.exports = router;