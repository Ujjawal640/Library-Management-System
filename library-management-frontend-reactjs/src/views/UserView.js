import React, { useState } from 'react';
import { useLibrary } from './contextHook';
import { Typography, Box, Divider, Snackbar, Alert } from '@mui/material';
import BookList from '../components/BookList';
import BookDetails from '../components/BookDetails';

export default function UserView(){
  const { books, lendBook, returnBook } = useLibrary();
  const [selected, setSelected] = useState(null);
  const [borrowed, setBorrowed] = useState([]);
  const [snack, setSnack] = useState({open:false, msg:'', severity:'success'});

  const handleLend = (id) => {
    const book = books.find(b=>b.id===id);
    if(!book || !book.available){
      setSnack({open:true, msg:'Book not available', severity:'error'}); return;
    }
    lendBook(id);
    setBorrowed(prev => [...prev, id]);
    setSnack({open:true, msg:'Book lent', severity:'success'});
  };

  const handleReturn = (id) => {
    returnBook(id);
    setBorrowed(prev => prev.filter(x=>x!==id));
    setSnack({open:true, msg:'Book returned', severity:'info'});
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>User Dashboard</Typography>
      <Divider sx={{ my:2 }} />
      <Typography variant="h6">Available Books</Typography>
      <BookList books={books} onLend={handleLend} onSelect={(b)=>setSelected(b)} />
      <Divider sx={{ my:2 }} />
      <Typography variant="h6">My Borrowed</Typography>
      <BookList books={books.filter(b=>borrowed.includes(b.id))} showLend={false} showReturn onReturn={handleReturn} onSelect={(b)=>setSelected(b)} />
      <BookDetails book={selected} open={Boolean(selected)} onClose={()=>setSelected(null)} />

      <Snackbar open={snack.open} autoHideDuration={2200} onClose={()=>setSnack({...snack, open:false})}>
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
