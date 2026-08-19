package com.thesis.auth_service.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesis.auth_service.model.LoginDTO;
import com.thesis.auth_service.model.User;
import com.thesis.auth_service.service.UserService;
import com.thesis.common.utils.ApiMessage;
import com.thesis.common.utils.error.ResourceNotFoundException;

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

    @GetMapping("/users")
    @ApiMessage("fetch all user")
    public ResponseEntity<List<User>> listUser() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUser());
    }

    @DeleteMapping("/users/{id}")
    @ApiMessage("Delete a User")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") long id) throws ResourceNotFoundException {
        if (!this.userService.isIdExist(id)) {
            throw new ResourceNotFoundException(
                    "Id: " + id + " không tồn tại");
        }
        this.userService.handleDeleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PutMapping("/users")
    @ApiMessage("Update User")
    public ResponseEntity<Void> updateUser(User user) {
        if (!userService.isIdExist(user.getId())) {
            throw new ResourceNotFoundException("Id không tồn tại");
        }
        this.userService.handleUpdateUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
