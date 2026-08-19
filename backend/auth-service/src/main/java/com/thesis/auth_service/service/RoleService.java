package com.thesis.auth_service.service;

import com.thesis.auth_service.repository.RoleRepository;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.thesis.auth_service.model.Role;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {

        this.roleRepository = roleRepository;
    }

    public Role getRoleById(long id) {
        Optional<Role> role = roleRepository.findById(id);
        if (!role.isPresent()) {

        }
        return role.get();
    }

}
