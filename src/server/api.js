const express = require("express")

const app = express();

const db = require("./db");
const models = require("../models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("*", async (req, res) => {
    return await res.status(404).json({
        status: "error",
        message: "Path not found!",
    });
});

const run = async (config = { host: "localhost", port: 3000 }) => {
    await db.mgmt.authenticate().then(async () => {
        await console.log("Database connection has been established successfully.");
        const sync = {
            force: process.env.NODE_ENV === "development" ? true : false,
            alter: process.env.NODE_ENV === "development" ? true : false,
        }
        console.log(sync);
        await db.mgmt.sync(sync).then(async () => {
            await console.log("Database has been synchronized successfully.");
            await app.listen(config.port, config.host, async () => {
                await console.log(`Server is listening on ${config.host}:${config.port}.`);
            });
        }).catch(async (error) => {
            await console.error("Unable to synchronize the database:", error);
        });
    }).catch(async (error) => {
        await console.error("Unable to connect to the database:", error);
    });
}

module.exports = { app, run };