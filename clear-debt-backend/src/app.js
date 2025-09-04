const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, resp) => {
    resp.json({message: "Clear Debt API health test - success"})
});

module.exports = app;