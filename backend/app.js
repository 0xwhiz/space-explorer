const express = require('express');
const cors = require('cors');
const apodRoute = require('./routes/apod');
const marsRoute = require('./routes/mars');
const epicRoute = require('./routes/epic');
const neowsRoute = require('./routes/neows');
const imageLibraryRoute = require('./routes/imageLibrary');
const serverless = require('serverless-http');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/apod', apodRoute);
app.use('/api/mars-photos', marsRoute);
app.use('/api/epic', epicRoute);
app.use('/api/neows', neowsRoute);
app.use('/api/image-search', imageLibraryRoute);

module.exports = serverless(app);
