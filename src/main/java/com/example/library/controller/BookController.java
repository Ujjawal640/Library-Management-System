package com.example.library.controller;

import com.example.library.model.Book;
import com.example.library.model.Loan;
import com.example.library.repository.BookRepository;
import com.example.library.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookRepository bookRepository;


    @GetMapping
    public ResponseEntity<Page<Book>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    )
    {
        Pageable pageable = PageRequest.of(page, size);
        Page<Book> books = bookRepository.findAll(pageable);
        return ResponseEntity.ok(books);
    }

    @PostMapping
    public ResponseEntity<Book> create(@RequestBody Book book) {
        return ResponseEntity.ok(bookRepository.save(book));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> get(@PathVariable Long id) {
        return bookRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }


}
