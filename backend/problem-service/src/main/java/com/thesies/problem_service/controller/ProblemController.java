package com.thesies.problem_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesies.problem_service.service.ProblemService;

@RestController
@RequestMapping("/api/v1")
public class ProblemController {
    private final ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping("/problems")
    public ResponseEntity<?> listProblem() {
        return ResponseEntity.ok(problemService.listProblems());
    }
}
