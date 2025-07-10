const axios = require('axios');
const { NASA_API_BASE } = require('../utils/nasaApi');
const NASA_API_KEY = process.env.NASA_API_KEY || '1fhWh7ecPgJHANiHx096bURDZXDaOx1wX1Yux8UU';

exports.getImageLibrary = async (req, res) => {
  try {
    const { q, media_type, year_start, year_end } = req.query;
    const params = {
      q,
      media_type,
      year_start,
      year_end,
    };
    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
    const url = `${NASA_API_BASE}/images-api/nasa.gov/search`;
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch NASA Image Library data' });
  }
}; 