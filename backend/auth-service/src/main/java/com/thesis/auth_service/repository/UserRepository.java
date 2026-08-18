package com.thesis.auth_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.thesis.auth_service.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select exists(select 1 from User u where u.email=:email)")
    boolean existsByEmail(String email);

    @Query("select u from User u where u.email=:email")
    User findByEmail(String email);
}
