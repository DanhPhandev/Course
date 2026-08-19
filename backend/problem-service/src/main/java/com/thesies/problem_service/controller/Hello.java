package com.thesies.problem_service.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class Hello {
    @GetMapping("/a")
    public String etMethodName() {
        return "hello";
    }

}
