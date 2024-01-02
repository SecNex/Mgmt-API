const db = require("../server/db");

const { DataTypes } = require("sequelize");

const Organization = db.mgmt.define("organization", {
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
    }
}, {
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    deletedAt: "deletedAt",
    updatedAt: "updatedAt",
    schema: "core",
});

module.exports = Organization;