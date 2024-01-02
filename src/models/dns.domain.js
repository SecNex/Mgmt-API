const db = require("../server/db");

const { DataTypes } = require("sequelize");

const Domain = db.mgmt.define("domain", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: function (value) {
            // domain.tld.
            if (!value.match(/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/)) {
                throw new Error("Invalid domain name!");
            }
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM,
        values: ["created", "active", "inactive", "deleted", "locked"],
        defaultValue: "created",
    },
    organizationId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    deletedAt: "deletedAt",
    updatedAt: "updatedAt",
    schema: "dns",
});

module.exports = Domain;