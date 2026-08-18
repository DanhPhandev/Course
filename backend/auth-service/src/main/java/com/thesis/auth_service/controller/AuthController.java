package com.thesis.auth_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesis.auth_service.model.LoginDTO;
import com.thesis.auth_service.model.RestLogin;
import com.thesis.auth_service.service.UserService;
import com.thesis.auth_service.utils.ApiMessage;
import com.thesis.auth_service.utils.error.ResourceNotFoundException;

@RestController
@RequestMapping("/api/v1")
public class AuthController {
    private UserService userService;
    private AuthenticationManagerBuilder authenticationManagerBuilder;

    public AuthController(UserService userService, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.userService = userService;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    @PostMapping("/auth/login")
    @ApiMessage("Đăng nhập thành công")
    public ResponseEntity<RestLogin> login(@RequestBody LoginDTO loginDTO) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDTO.getEmail(), loginDTO.getPassword());
        // xác thực người dùng => cần viết hàm loadUserByUsername
        Authentication authentication = authenticationManagerBuilder
                .getObject()
                .authenticate(authenticationToken);
        RestLogin restLogin = new RestLogin();
        return ResponseEntity.ok().body(restLogin);
    }

    @PostMapping("/auth/register")
    public String register(@RequestBody LoginDTO loginDTO) {
        if (userService.isEmailExist(loginDTO.getEmail())) {
            throw new ResourceNotFoundException("Email đã tồn tại");
        }
        return userService.handleCreateUser(loginDTO);
    }
}
