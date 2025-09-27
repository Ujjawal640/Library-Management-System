package com.example.library.schedulerService;

import com.example.library.model.Fine;
import com.example.library.model.Loan;
import com.example.library.model.User;
import com.example.library.repository.FineRepository;
import com.example.library.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FineSchedulerService {

    private final LoanRepository loanRepository;
    private final FineRepository fineRepository;

    private static final double DAILY_FINE_AMOUNT = 10.0; // example: 10 units per day
    private static final String OVERDUE_REASON = "Overdue book";

    // Runs every night at 1 AM
    @Scheduled(cron = "0 0 1 * * ?")
    public void generateFines() {
        OffsetDateTime now = OffsetDateTime.now();

        // Get all loans that are overdue and not returned
        List<Loan> overdueLoans = loanRepository.findAll()
                .stream()
                .filter(loan -> loan.getReturnedAt() == null
                        && loan.getDueAt() != null
                        && loan.getDueAt().isBefore(now))
                .toList();

        for (Loan loan : overdueLoans) {
            User member = loan.getMember();

            // Check if a fine with "Overdue book" already exists for this loan
            Optional<Fine> existingFineOpt = fineRepository.findByLoanIdAndReason(loan.getId(), OVERDUE_REASON);

            Fine fine;
            if (existingFineOpt.isPresent()) {
                fine = existingFineOpt.get();
                fine.setAmount(fine.getAmount() + DAILY_FINE_AMOUNT); // increment existing fine
                fine.setAssessedAt(now);
            } else {
                fine = Fine.builder()
                        .loan(loan)
                        .member(member)
                        .amount(DAILY_FINE_AMOUNT)
                        .reason(OVERDUE_REASON)
                        .assessedAt(now)
                        .build();
            }

            fineRepository.save(fine);
        }

        System.out.println("Fine generation completed at " + now);
    }
}
