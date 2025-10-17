import axios from 'axios';
const API = process.env.VITE_API_BASE || 'http://localhost:4000/api';

export async function listTournaments() {
  const r = await axios.get(`${API}/tournaments`);
  return r.data;
}
export async function createTournament(title) {
  const r = await axios.post(`${API}/tournaments`, { title });
  return r.data;
}
export async function getTournament(id) {
  const r = await axios.get(`${API}/tournaments/${id}`);
  return r.data;
}
export async function addMeme(tournamentId, meme) {
  const r = await axios.post(`${API}/tournaments/${tournamentId}/memes`, meme);
  return r.data;
}
export async function vote(memeId) {
  const r = await axios.post(`${API}/vote`, { memeId, delta: 1 });
  return r.data;
}
