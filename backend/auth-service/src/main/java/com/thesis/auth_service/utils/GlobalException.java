package com.thesis.auth_service.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.thesis.common.utils.RestResponse;
import com.thesis.common.utils.error.ResourceNotFoundException;

@RestControllerAdvice
public class GlobalException {
    @ExceptionHandler(value = { ResourceNotFoundException.class, UsernameNotFoundException.class,
    })
    public ResponseEntity<RestResponse<Object>> handleException(Exception ex) {
        RestResponse<Object> rest = new RestResponse<>();
        rest.setStatusCode(HttpStatus.BAD_REQUEST.value());
        rest.setError("Exception occurs...");
        rest.setMessage(ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(rest);
    }

    @ExceptionHandler(value = { BadCredentialsException.class })
    public ResponseEntity<RestResponse<Object>> handleExceptionLogin(Exception ex) {
        RestResponse<Object> rest = new RestResponse<>();
        rest.setStatusCode(HttpStatus.BAD_REQUEST.value());
        rest.setError("Tên đăng nhập hoặc mật khẩu không đúng");
        rest.setMessage(ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(rest);
    }
}
