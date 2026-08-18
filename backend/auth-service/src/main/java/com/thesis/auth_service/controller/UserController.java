package com.thesis.auth_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesis.auth_service.model.LoginDTO;
import com.thesis.auth_service.service.UserService;
import com.thesis.auth_service.utils.ApiMessage;
import com.thesis.auth_service.utils.error.ResourceNotFoundException;

@RequestMapping("/api/v1")
@RestController
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    @ApiMessage("create a new user")
    public ResponseEntity<Void> createNewUser(@RequestBody LoginDTO loginDTO) {
        if (userService.isEmailExist(loginDTO.getEmail())) {
            throw new ResourceNotFoundException("Email đã tồn tại");
        }
        userService.handleCreateUser(loginDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }
}
