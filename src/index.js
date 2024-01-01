require("dotenv").config();

const server = require("./server");

const serverConfig = {
    host: process.env.API_HOST || "localhost",
    port: 3000,
};

server.api.run(serverConfig);