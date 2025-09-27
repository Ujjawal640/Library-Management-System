import React, { createContext, useContext, useState } from 'react';
import { initialBooks } from '../fakeData';

const LibraryContext = createContext();

export function useLibrary(){ return useContext(LibraryContext); }

export function LibraryProvider({ children }){
  const [books, setBooks] = useState(initialBooks);
  // lend: mark available false
  const lendBook = (id) => {
    setBooks(prev => prev.map(b => b.id === id ? { ...b, available: false } : b));
  };
  // return: mark available true (re-lend possible after returning)
  const returnBook = (id) => {
    setBooks(prev => prev.map(b => b.id === id ? { ...b, available: true } : b));
  };
  // add new book
  const addBook = (book) => {
    setBooks(prev => [...prev, book]);
  };
  // delta update: only changed fields
  const updateBook = (id, updates) => {
    setBooks(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };
  return (
    <LibraryContext.Provider value={{ books, lendBook, returnBook, addBook, updateBook }}>
      {children}
    </LibraryContext.Provider>
  );
}
