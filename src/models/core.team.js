const db = require("../server/db");

const { DataTypes } = require("sequelize");

const Team = db.mgmt.define("team", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    organizationId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    deletedAt: "deletedAt",
    updatedAt: "updatedAt",
    schema: "core",
});

module.exports = Team;