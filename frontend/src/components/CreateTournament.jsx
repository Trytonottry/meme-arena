import React, { useState } from 'react';
import { createTournament } from '../api';

export default function CreateTournament({ onCreated }) {
  const [title, setTitle] = useState('');
  async function submit(e) {
    e.preventDefault();
    if (!title) return alert('enter title');
    await createTournament(title);
    setTitle('');
    if (onCreated) onCreated();
  }
  return (
    <form onSubmit={submit}>
      <h3>Create tournament</h3>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}
