const { Sequelize } = require("sequelize");

const mgmt = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "secnex",
    logging: (process.env.NODE_ENV || "development") === "development" ? console.log : false,
});

module.exports = { mgmt };