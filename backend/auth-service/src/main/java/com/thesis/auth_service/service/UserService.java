package com.thesis.auth_service.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.thesis.auth_service.model.User;
import com.thesis.auth_service.model.DTO.LoginDTO;
import com.thesis.auth_service.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleService roleService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
    }

    public boolean isEmailExist(String email) {
        return userRepository.existsByEmail(email);
    }

    public String handleCreateUser(LoginDTO loginDTO) {
        User user = new User();
        user.setEmail(loginDTO.getEmail());
        user.setPassword(passwordEncoder.encode(loginDTO.getPassword()));
        user.setRole(roleService.getRoleById(1));
        userRepository.save(user);
        return "Đăng kí thành công";
    }

    public void handleSave(User user) {
        userRepository.save(user);
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public User getUserByEmail(String email) {
        if (isEmailExist(email)) {
            return userRepository.findByEmail(email);
        }
        return null;
    }

    public void updateUserToken(String token, String email) {
        User currentUser = this.getUserByEmail(email);
        if (currentUser != null) {
            currentUser.setRefreshToken(token);
            this.userRepository.save(currentUser);
        }
    }

    public User getUserByRefreshTokenAndEmail(String token, String email) {
        return this.userRepository.findUserByRefreshTokenAndEmail(token, email);
    }

    public boolean isIdExist(long id) {
        return userRepository.existsById(id);
    }

    public void handleDeleteUser(long id) {
        userRepository.deleteById(id);
    }

    public void handleUpdateUser(User user) {
        userRepository.save(user);
    }
}
