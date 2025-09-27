package com.example.library.repository;

import com.example.library.model.Fine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FineRepository extends JpaRepository<Fine, Long> {
    Optional<Fine> findByLoanId(Long loanId);
    Optional<Fine> findByLoanIdAndReason(Long loanId, String reason);

}
