const axios = require('axios');
const { NASA_API_BASE } = require('../utils/nasaApi');

const NASA_API_KEY = process.env.NASA_API_KEY || '1fhWh7ecPgJHANiHx096bURDZXDaOx1wX1Yux8UU';

exports.getMarsPhotos = async (req, res) => {
  const { rover = 'curiosity', date, camera } = req.query;
  console.log(`[Mars] Endpoint called for rover: ${rover}${date ? `, date: ${date}` : ''}${camera ? `, camera: ${camera}` : ''}`);
  
  try {
    const params = {
      api_key: NASA_API_KEY,
      earth_date: date,
      camera,
    };
    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
    const url = `${NASA_API_BASE}/mars-photos/api/v1/rovers/${rover}/photos`;
    const response = await axios.get(url, { params });
    console.log(`[Mars] Successfully fetched ${response.data.photos?.length || 0} photos for ${rover}`);
    res.json(response.data);
  } catch (error) {
    console.error(`[Mars] Error fetching photos:`, error.message);
    res.status(500).json({ error: 'Failed to fetch Mars Rover Photos' });
  }
}; 