import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function BookDetails({ book, open, onClose }){
  if(!book) return null;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Book Details</DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6">{book.title}</Typography>
        <Typography variant="subtitle2" color="text.secondary">{book.author}</Typography>
        <Typography sx={{ mt:1 }}>{book.description}</Typography>
        <Typography sx={{ mt:1 }}><strong>Status:</strong> {book.available ? 'Available' : 'Borrowed'}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
