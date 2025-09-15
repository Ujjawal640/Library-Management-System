import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';

export default function BookUpdateForm({ open, book, onClose, onUpdate }){
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  useEffect(()=>{
    if(book){ setTitle(book.title || ''); setAuthor(book.author || ''); setDescription(book.description || ''); }
  }, [book]);

  const handleSave = ()=>{
    const updates = {};
    if(title !== (book?.title || '')) updates.title = title;
    if(author !== (book?.author || '')) updates.author = author;
    if(description !== (book?.description || '')) updates.description = description;
    if(Object.keys(updates).length>0) onUpdate(book.id, updates);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Update Book (delta)</DialogTitle>
      <DialogContent>
        <Box sx={{ display:'flex', flexDirection:'column', gap:2, mt:1 }}>
          <TextField label="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <TextField label="Author" value={author} onChange={e=>setAuthor(e.target.value)} />
          <TextField label="Description" value={description} onChange={e=>setDescription(e.target.value)} multiline rows={3} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
}
