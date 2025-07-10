const axios = require('axios');
const { NASA_API_BASE } = require('../utils/nasaApi');
const NASA_API_KEY = process.env.NASA_API_KEY || '1fhWh7ecPgJHANiHx096bURDZXDaOx1wX1Yux8UU';

exports.getNeoWs = async (req, res) => {
  const { start_date, end_date } = req.query;
  console.log(`[NEO] Endpoint called${start_date ? ` from ${start_date}` : ''}${end_date ? ` to ${end_date}` : ''}`);
  
  try {
    const params = {
      api_key: NASA_API_KEY,
      start_date,
      end_date,
    };
    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
    const url = `${NASA_API_BASE}/neo/rest/v1/feed`;
    const response = await axios.get(url, { params });
    console.log(`[NEO] Successfully fetched ${response.data.element_count || 0} near earth objects`);
    res.json(response.data);
  } catch (error) {
    console.error(`[NEO] Error fetching data:`, error.message);
    res.status(500).json({ error: 'Failed to fetch NeoWs data' });
  }
}; 