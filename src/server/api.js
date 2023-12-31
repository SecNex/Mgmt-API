const express = require("express")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("*", async (req, res) => {
    return await res.status(404).json({
        status: "error",
        message: "Path not found!",
    });
});

const run = async (config = { host: "localhost", port: 3000 }) => {
    await app.listen(config.port, config.host, async () => {
        await console.log(`Server is running on http://${config.host}:${config.port}`);
    }
    );
}

module.exports = { app, run };