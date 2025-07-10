const axios = require('axios');

const NASA_API_BASE = 'https://api.nasa.gov';

const nasaAxios = axios.create({
  baseURL: NASA_API_BASE,
  timeout: 10000,
});

module.exports = {
  NASA_API_BASE,
  nasaAxios,
}; 