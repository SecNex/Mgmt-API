const db = require("../server/db");

const { DataTypes } = require("sequelize");

const Record = db.mgmt.define("record", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    domainId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recordType: {
        type: DataTypes.ENUM,
        values: ["A", "AAAA", "CNAME", "MX", "NS", "TXT", "SRV", "PTR"],
        allowNull: false
    },
    ttl: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 300
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    deletedAt: "deletedAt",
    updatedAt: "updatedAt",
    schema: "dns",
});

module.exports = Record;