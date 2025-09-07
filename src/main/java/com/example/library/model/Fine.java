package com.example.library.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "fines")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Fine {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "loan_id")
    private Loan loan;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private User member;

    private Double amount;
    private String reason;
    private OffsetDateTime assessedAt;
    private OffsetDateTime settledAt;
}
