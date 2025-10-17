const Database = require('better-sqlite3');
const { databaseFile } = require('./config');
const db = new Database(databaseFile);

// Initialize tables
db.prepare(`
CREATE TABLE IF NOT EXISTS tournaments (
  id TEXT PRIMARY KEY,
  title TEXT,
  created_at INTEGER
);`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS memes (
  id TEXT PRIMARY KEY,
  tournament_id TEXT,
  author TEXT,
  image_url TEXT,
  caption TEXT,
  created_at INTEGER,
  votes INTEGER DEFAULT 0
);`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS matches (
  id TEXT PRIMARY KEY,
  tournament_id TEXT,
  round INTEGER,
  left_meme TEXT,
  right_meme TEXT,
  winner TEXT,
  created_at INTEGER
);`).run();

module.exports = db;
