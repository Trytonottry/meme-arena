const axios = require('axios');
const qs = require('qs');
const { reddit } = require('./config');

async function getAccessToken(code) {
  const tokenUrl = 'https://www.reddit.com/api/v1/access_token';
  const basic = Buffer.from(`${reddit.clientId}:${reddit.clientSecret}`).toString('base64');
  const payload = qs.stringify({ grant_type: 'authorization_code', code, redirect_uri: reddit.redirectUri });
  const res = await axios.post(tokenUrl, payload, {
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  return res.data;
}
// other helper functions (post comment, read post) can be added.
module.exports = { getAccessToken };
