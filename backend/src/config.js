require('dotenv').config();
module.exports = {
  port: process.env.PORT || 4000,
  databaseFile: process.env.DATABASE_FILE || './data/memearena.db',
  useReddit: (process.env.USE_REDDIT === 'true'),
  reddit: {
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    redirectUri: process.env.REDDIT_REDIRECT_URI
  },
  demoMode: (process.env.DEMO_MODE !== 'false')
};
