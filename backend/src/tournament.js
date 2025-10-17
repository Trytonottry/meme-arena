const db = require('./db');
const { v4: uuid } = require('uuid');

function createTournament(title) {
  const id = uuid();
  const now = Date.now();
  db.prepare('INSERT INTO tournaments (id, title, created_at) VALUES (?, ?, ?)').run(id, title, now);
  return { id, title, created_at: now };
}

function addMeme(tournamentId, { author, image_url, caption }) {
  const id = uuid();
  const now = Date.now();
  db.prepare(`INSERT INTO memes (id, tournament_id, author, image_url, caption, created_at) VALUES (?, ?, ?, ?, ?, ?)`)
    .run(id, tournamentId, author || 'anon', image_url, caption || '', now);
  return getMeme(id);
}

function getTournament(id) {
  const t = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(id);
  if (!t) return null;
  const memes = db.prepare('SELECT * FROM memes WHERE tournament_id = ?').all(id);
  const matches = db.prepare('SELECT * FROM matches WHERE tournament_id = ?').all(id);
  return { ...t, memes, matches };
}

function getMeme(id) {
  return db.prepare('SELECT * FROM memes WHERE id = ?').get(id);
}

function listTournaments() {
  return db.prepare('SELECT * FROM tournaments ORDER BY created_at DESC').all();
}

function ensureBracket(tournamentId) {
  // Simple bracket: pair memes into matches for round 1 if matches empty
  const matches = db.prepare('SELECT * FROM matches WHERE tournament_id = ?').all(tournamentId);
  if (matches.length > 0) return matches;
  const memes = db.prepare('SELECT * FROM memes WHERE tournament_id = ? ORDER BY created_at').all(tournamentId);
  const pairs = [];
  for (let i = 0; i < memes.length; i += 2) {
    const left = memes[i];
    const right = memes[i+1] || null;
    const matchId = uuid();
    const now = Date.now();
    db.prepare(`INSERT INTO matches (id, tournament_id, round, left_meme, right_meme, created_at) VALUES (?, ?, ?, ?, ?, ?)`).
      run(matchId, tournamentId, 1, left ? left.id : null, right ? right.id : null, now);
    pairs.push(db.prepare('SELECT * FROM matches WHERE id = ?').get(matchId));
  }
  return db.prepare('SELECT * FROM matches WHERE tournament_id = ?').all(tournamentId);
}

function voteMeme(memeId, delta = 1) {
  db.prepare('UPDATE memes SET votes = votes + ? WHERE id = ?').run(delta, memeId);
  return getMeme(memeId);
}

module.exports = {
  createTournament,
  addMeme,
  getTournament,
  listTournaments,
  ensureBracket,
  voteMeme,
  getMeme
};
