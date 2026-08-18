package com.thesis.auth_service.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.thesis.auth_service.model.LoginDTO;
import com.thesis.auth_service.model.User;
import com.thesis.auth_service.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean isEmailExist(String email) {
        return userRepository.existsByEmail(email);
    }

    public String handleCreateUser(LoginDTO loginDTO) {
        User user = new User();
        user.setEmail(loginDTO.getEmail());
        user.setPassword(passwordEncoder.encode(loginDTO.getPassword()));
        userRepository.save(user);
        return "Đăng kí thành công";
    }

    public User getUserByEmail(String email) {
        if (isEmailExist(email)) {
            return userRepository.findByEmail(email);
        }
        return null;
    }

}
