const axios = require('axios');
const { NASA_API_BASE } = require('../utils/nasaApi');
const NASA_API_KEY = process.env.NASA_API_KEY || '1fhWh7ecPgJHANiHx096bURDZXDaOx1wX1Yux8UU';

exports.getEpic = async (req, res) => {
  const { date, type = 'natural' } = req.query;
  console.log(`[EPIC] Endpoint called for type: ${type}${date ? `, date: ${date}` : ''}`);
  
  try {
    let url = `${NASA_API_BASE}/EPIC/api/${type}`;
    if (date) url += `/date/${date}`;
    const response = await axios.get(url, {
      params: { api_key: NASA_API_KEY },
    });
    console.log(`[EPIC] Successfully fetched ${Array.isArray(response.data) ? response.data.length : 0} images`);
    res.json(response.data);
  } catch (error) {
    console.error(`[EPIC] Error fetching data:`, error.message);
    res.status(500).json({ error: 'Failed to fetch EPIC data' });
  }
}; 