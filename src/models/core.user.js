const db = require("../server/db");

const { DataTypes } = require("sequelize");

const User = db.mgmt.define("user", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: function (value) {
            // No special characters, spaces, or leading/trailing hyphens.
            // _, -, and . are allowed in the middle, but not consecutively.
            // 3-16 characters long.
            if (!value.match(/^[a-zA-Z0-9]+([._-]{1}[a-zA-Z0-9]+)*$/)) {
                throw new Error("Invalid username!");
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: function (value) {
            // Format: admin@exmaple.com, admin@example.social
            if (!value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
                throw new Error("Invalid email address!");
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ["created", "verified", "active", "inactive", "deleted", "locked"],
        defaultValue: "created",
        allowNull: false
    },
    customerId: {
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

module.exports = User;
