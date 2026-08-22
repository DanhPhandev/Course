package com.thesies.problem_service.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.thesies.problem_service.domain.Problems;
import com.thesies.problem_service.repository.ProblemRepository;

@Service
public class ProblemService {
    private final ProblemRepository problemRepository;

    public ProblemService(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    public List<Problems> listProblems() {
        return problemRepository.findAll();
    }

}
