const axios = require('axios');
const { NASA_API_BASE } = require('../utils/nasaApi');
const NASA_API_KEY = process.env.NASA_API_KEY || '1fhWh7ecPgJHANiHx096bURDZXDaOx1wX1Yux8UU';

exports.getApod = async (req, res) => {
  const { date } = req.query;
  console.log(`[APOD] Endpoint called${date ? ` for date: ${date}` : ' for today'}`);
  
  try {
    console.log(`[APOD] Started fetching data for ${date || 'today'}`);
    const url = `${NASA_API_BASE}/planetary/apod`;
    const response = await axios.get(url, {
      params: {
        api_key: NASA_API_KEY,
        date,
      },
    });
    console.log(`[APOD] Successfully fetched data for ${date || 'today'}`);
    res.json(response.data);
  } catch (error) {
    console.error(`[APOD] Error fetching data:`, error.message);
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
}; 