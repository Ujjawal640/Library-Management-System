package com.example.library.repository;

import com.example.library.model.Loan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    Page<Loan> findByMember_Id(Long memberId, Pageable pageable);
}
