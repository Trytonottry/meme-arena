import React, { useEffect, useState } from 'react';
import { getTournament, vote } from '../api';

export default function BracketView({ tournamentId }) {
  const [data, setData] = useState(null);

  async function refresh(){
    const t = await getTournament(tournamentId);
    setData(t);
  }

  useEffect(()=>{
    refresh();
    const iv = setInterval(refresh, 3000);
    return ()=>clearInterval(iv);
  }, [tournamentId]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>{data.title}</h2>
      <div>
        {data.matches.map(m => (
          <div key={m.id} style={{display:'flex', gap:10, marginBottom:10, alignItems:'center'}}>
            <MatchCard id={m.id} leftId={m.left_meme} rightId={m.right_meme} tournamentId={tournamentId} onVote={refresh} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchCard({ leftId, rightId, onVote }) {
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);

  async function load() {
    if (leftId) {
      const res = await fetch(`${import.meta.env.VITE_API_BASE||'http://localhost:4000'}/api/tournaments/`).then(r=>r.json());
      // For simplicity, we'll fetch meme directly
    }
  }

  // Simpler: fetch meme details by calling tournament endpoint and filtering
  useEffect(()=> {
    async function f(){
      // fetch parent tournament and find the memes
      const tId = window.location.href.split('/').pop(); // not reliable; use workaround
      // Instead call backend to list tournaments and matches; to keep simple, call /api/tournaments and search
      const res = await fetch(`${import.meta.env.VITE_API_BASE||'http://localhost:4000'}/api/tournaments`).then(r=>r.json());
      // Not ideal, but UI remains functional for demo
    }
    // no-op
  }, []);

  return (
    <div style={{display:'flex', gap:10}}>
      <VoteCard memeId={leftId} onVote={onVote} side="Left" />
      <div style={{alignSelf:'center'}}>vs</div>
      <VoteCard memeId={rightId} onVote={onVote} side="Right" />
    </div>
  )
}

function VoteCard({ memeId, onVote, side }) {
  const [meme, setMeme] = React.useState(null);

  useEffect(()=>{
    async function f(){
      if(!memeId) return;
      const tlist = await fetch(`${import.meta.env.VITE_API_BASE||'http://localhost:4000'}/api/tournaments`).then(r=>r.json());
      // find meme in tournaments
      let found = null;
      for (const t of tlist) {
        const td = await fetch(`${import.meta.env.VITE_API_BASE||'http://localhost:4000'}/api/tournaments/${t.id}`).then(r=>r.json());
        const m = td.memes.find(x => x.id === memeId);
        if (m) { found = m; break; }
      }
      setMeme(found);
    }
    f();
  }, [memeId]);

  async function doVote(){
    if (!memeId) return;
    await fetch(`${import.meta.env.VITE_API_BASE||'http://localhost:4000'}/api/vote`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ memeId })
    });
    if (onVote) onVote();
  }

  if (!memeId) return <div style={{width:220, height:120, border:'1px dashed #ccc', padding:8}}>BYE</div>;
  if (!meme) return <div>loading...</div>;

  return (
    <div style={{width:220, border:'1px solid #ddd', padding:8}}>
      <img src={meme.image_url} alt={meme.caption} style={{width:'100%', height:120, objectFit:'cover'}}/>
      <div style={{display:'flex', justifyContent:'space-between', marginTop:6}}>
        <small>{meme.caption}</small>
        <div>
          <button onClick={doVote}>Vote</button>
          <div style={{fontSize:12}}>{meme.votes || 0} votes</div>
        </div>
      </div>
    </div>
  )
}
