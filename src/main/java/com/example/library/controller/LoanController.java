package com.example.library.controller;

import com.example.library.model.Book;
import com.example.library.model.Loan;
import com.example.library.model.User;
import com.example.library.repository.BookRepository;
import com.example.library.repository.LoanRepository;
import com.example.library.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.Map;

@RestController
@RequestMapping("/loans")
public class LoanController {
    private final LoanRepository loanRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public LoanController(LoanRepository loanRepository, BookRepository bookRepository, UserRepository userRepository) {
        this.loanRepository = loanRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<?> checkout(@RequestBody Map<String, Long> payload) {
        Long bookId = payload.get("bookId");
        Long memberId = payload.get("memberId");
        Book book = bookRepository.findById(bookId).orElse(null);
        User member = userRepository.findById(memberId).orElse(null);
        if (book==null || member==null) return ResponseEntity.badRequest().body(Map.of("error","invalid_book_or_member"));
        Loan loan = Loan.builder()
                .book(book)
                .member(member)
                .checkedOutAt(OffsetDateTime.now())
                .dueAt(OffsetDateTime.now().plusDays(14))
                .renewCount(0)
                .build();
        loanRepository.save(loan);
        return ResponseEntity.status(201).body(loan);
    }

    @PostMapping("/{id}/return")
    public ResponseEntity<?> ret(@PathVariable Long id) {
        var loanOpt = loanRepository.findById(id);
        if (loanOpt.isEmpty()) return ResponseEntity.notFound().build();
        Loan loan = loanOpt.get();
        loan.setReturnedAt(OffsetDateTime.now());
        loanRepository.save(loan);
        return ResponseEntity.ok(loan);
    }
}
