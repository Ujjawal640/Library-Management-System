import React from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';

export default function BookList({ books, onLend, onSelect, showLend=true, showReturn=false, onReturn }){
  return (
    <Grid container spacing={2}>
      {books.map(book => (
        <Grid item xs={12} sm={6} md={4} key={book.id}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">{book.title}</Typography>
              <Typography variant="body2" color="text.secondary">{book.author}</Typography>
              <Typography variant="body2" sx={{ mt:1 }}>{book.description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => onSelect && onSelect(book)}>Details</Button>
              {book.available ? showLend && <Button size="small" onClick={() => onLend(book.id)}>Lend</Button> : <Typography sx={{ ml:1, mr:1 }} color="error">Borrowed</Typography>}
              {showReturn && <Button size="small" onClick={() => onReturn(book.id)}>Return</Button>}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
