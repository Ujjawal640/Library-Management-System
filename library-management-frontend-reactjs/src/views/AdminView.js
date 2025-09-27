import React, { useState } from 'react';
import { useLibrary } from './contextHook';
import { Typography, Box, Divider, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Paper, Snackbar, Alert } from '@mui/material';
import BookForm from './componentsHook/BookFormHook';
import BookUpdateForm from '../components/BookUpdateForm';
import BookDetails from '../components/BookDetails';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import TableContainer from '@mui/material/TableContainer';

export default function AdminView(){
  const { books, addBook, updateBook } = useLibrary();
  const [selected, setSelected] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [snack, setSnack] = useState({open:false, msg:'', severity:'success'});

  const handleEdit = (b) => { setSelected(b); setOpenUpdate(true); };
  const handleDetails = (b) => { setSelected(b); setOpenDetails(true); };

  const handleUpdate = (id, updates) => {
    updateBook(id, updates);
    setSnack({open:true, msg:'Book updated', severity:'success'});
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Admin Dashboard</Typography>
      <BookForm onAdd={(book)=>{ addBook(book); setSnack({open:true, msg:'Book added', severity:'success'}); }} />
      <Divider sx={{ my:2 }} />
      <Typography variant="h6">Manage Books</Typography>
      <TableContainer component={Paper} sx={{ mt:2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map(b=>(
              <TableRow key={b.id}>
                <TableCell>{b.title}</TableCell>
                <TableCell>{b.author}</TableCell>
                <TableCell>{b.description}</TableCell>
                <TableCell>{b.available ? 'Available' : 'Borrowed'}</TableCell>
                <TableCell>
                  <IconButton onClick={()=>handleDetails(b)}><InfoIcon /></IconButton>
                  <IconButton onClick={()=>handleEdit(b)}><EditIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <BookUpdateForm open={openUpdate} book={selected} onClose={()=>setOpenUpdate(false)} onUpdate={handleUpdate} />
      <BookDetails book={selected} open={openDetails} onClose={()=>setOpenDetails(false)} />

      <Snackbar open={snack.open} autoHideDuration={2500} onClose={()=>setSnack({...snack, open:false})}>
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
