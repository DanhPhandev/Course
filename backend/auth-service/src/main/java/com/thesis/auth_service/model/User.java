package com.thesis.auth_service.model;

import java.time.LocalDateTime;

import com.thesis.auth_service.model.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    @NotBlank
    private String email;
    private String password;
    @Column(columnDefinition = "Text")
    private String refreshToken;
    @Column(columnDefinition = "Text")
    private String avatar;
    private Status status;
    @ManyToOne
    @JoinColumn(name = "roles_id")
    private Role role;
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
    private LocalDateTime lasDateTime;
}
