const db = require("../server/db");

const { DataTypes } = require("sequelize");

const Secret = db.mgmt.define("secret", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM,
        values: ["access", "refresh", "password", "otp", "totp", "recovery"],
        defaultValue: "access",
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false
    },
    applicationId: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    deletedAt: "deletedAt",
    updatedAt: "updatedAt",
    schema: "auth",
});

module.exports = Secret;