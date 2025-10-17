import React, { useEffect, useState } from 'react';
import CreateTournament from './components/CreateTournament';
import BracketView from './components/BracketView';
import SubmitMeme from './components/SubmitMeme';
import { listTournaments, getTournament } from './api';

export default function App(){
  const [tournaments, setTournaments] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh(){
    const t = await listTournaments();
    setTournaments(t);
    if (t.length && !active) setActive(t[0].id);
  }

  async function openTournament(id){
    const data = await getTournament(id);
    setActive(id);
    setTimeout(refresh, 500); // quick refresh
  }

  return (
    <div style={{padding:20,fontFamily:'Inter, sans-serif'}}>
      <h1>Meme Arena</h1>
      <div style={{display:'flex', gap:20}}>
        <div style={{flex:1}}>
          <CreateTournament onCreated={refresh}/>
          <h3>Active tournaments</h3>
          <ul>
            {tournaments.map(t => (
              <li key={t.id}>
                <button onClick={()=>openTournament(t.id)}>{t.title}</button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{flex:2}}>
          {active ? (
            <>
              <SubmitMeme tournamentId={active} />
              <BracketView tournamentId={active} />
            </>
          ) : (
            <div>No tournament selected</div>
          )}
        </div>
      </div>
    </div>
  );
}
