package com.thesies.problem_service.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class TestCases {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "Text")
    private String input;
    @Column(columnDefinition = "Text")
    private String expectedOutput;
    private boolean sample;
    private LocalDateTime generatedAt;
    @ManyToOne
    @JoinColumn(name = "problems_id")
    private Problems problems;
}
