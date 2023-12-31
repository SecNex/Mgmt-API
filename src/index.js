const server = require("./server");

const serverConfig = {
    host: "localhost",
    port: 3000,
};

server.api.run(serverConfig);