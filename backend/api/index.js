const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Congratulation 🎉🎉! Our Express server is Running on Vercel"));

app.listen(5000, () => console.log("Server ready on port 5000."));

module.exports = app;