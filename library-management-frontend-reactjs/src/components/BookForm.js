import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

export default function BookForm({ onAdd }){
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if(!title.trim() || !author.trim()) return;
    onAdd({ id: Date.now(), title: title.trim(), author: author.trim(), description: description.trim(), available: true });
    setTitle(''); setAuthor(''); setDescription('');
  };

  return (
    <Box component="form" onSubmit={submit} sx={{ display:'flex', gap:2, flexWrap:'wrap' }}>
      <TextField label="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      <TextField label="Author" value={author} onChange={e=>setAuthor(e.target.value)} required />
      <TextField label="Description" value={description} onChange={e=>setDescription(e.target.value)} sx={{ flex:1 }} />
      <Button type="submit" variant="contained">Add Book</Button>
    </Box>
  );
}
