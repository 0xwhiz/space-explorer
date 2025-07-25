const express = require("express");
const cors = require("cors");
const apodRoute = require('../routes/apod');
const marsRoute = require('../routes/mars');
const epicRoute = require('../routes/epic');
const neowsRoute = require('../routes/neows');
const imageLibraryRoute = require('../routes/imageLibrary');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: ['https://bounce-nasa-space-explorer.vercel.app/', 'http://localhost:8001'], // Add your frontend URLs here
  credentials: true // if you need to send cookies/auth headers
}));

app.use(cors());
app.use(express.json());

app.use('/api/apod', apodRoute);
app.use('/api/mars-photos', marsRoute);
app.use('/api/epic', epicRoute);
app.use('/api/neows', neowsRoute);
app.use('/api/image-search', imageLibraryRoute);

app.get("/", (req, res) => res.send("Space explorer server is Running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;