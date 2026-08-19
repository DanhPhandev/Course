package com.thesies.problem_service.domain;

import java.util.List;

import com.thesies.problem_service.domain.enums.Difficulty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Problems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(columnDefinition = "Text")
    private String description;
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;
    @Column(columnDefinition = "Text")
    private String inputFormat;
    @Column(columnDefinition = "Text")
    private String outputFormat;
    @Column(columnDefinition = "Text")
    private String constraints;
    @Column(columnDefinition = "Text")
    private String starterCode;
    private int timeLimit;
    private int memoryLimit;
    private int points;
    @OneToMany(mappedBy = "problems")
    private List<ProblemsLanguage> programlanguage;
    @OneToMany(mappedBy = "problems")
    private List<ProblemsTags> problemsTags;
}
