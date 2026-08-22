package com.thesies.problem_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thesies.problem_service.domain.Problems;

public interface ProblemRepository extends JpaRepository<Problems, Long> {

}
