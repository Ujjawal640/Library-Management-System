package com.example.library.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "books")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Book {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String isbn;
    private String title;
    private String subtitle;
    private Integer publishYear;
    private String language;
    private String author;
    private Integer quantity;
}
