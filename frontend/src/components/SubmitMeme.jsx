import React, { useState } from 'react';
import { addMeme } from '../api';

export default function SubmitMeme({ tournamentId }) {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!imageUrl) return alert('image url required');
    await addMeme(tournamentId, { image_url: imageUrl, caption });
    setImageUrl(''); setCaption('');
    // optional: dispatch event or refresh parent
    window.location.reload();
  }

  return (
    <form onSubmit={submit}>
      <h3>Submit meme</h3>
      <input placeholder="Image URL" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} style={{width:'100%'}} />
      <input placeholder="Caption (optional)" value={caption} onChange={e=>setCaption(e.target.value)} style={{width:'100%'}} />
      <button type="submit">Submit</button>
    </form>
  );
}
