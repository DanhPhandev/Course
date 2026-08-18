package com.thesis.auth_service.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.thesis.auth_service.model.LoginDTO;
import com.thesis.auth_service.model.ResLoginDTO;
import com.thesis.auth_service.model.Role;
import com.thesis.auth_service.model.User;
import com.thesis.auth_service.service.SecurityUtil;
import com.thesis.auth_service.service.UserService;
import com.thesis.common.utils.ApiMessage;
import com.thesis.common.utils.error.ResourceNotFoundException;

@RestController
@RequestMapping("/api/v1")
public class AuthController {
        private UserService userService;
        private AuthenticationManagerBuilder authenticationManagerBuilder;
        private SecurityUtil securityUtil;
        @Value("${danh.jwt.refresh-token-validity-in-seconds}")
        private long refreshTokenExpiration;

        public AuthController(UserService userService, AuthenticationManagerBuilder authenticationManagerBuilder,
                        SecurityUtil securityUtil) {
                this.userService = userService;
                this.authenticationManagerBuilder = authenticationManagerBuilder;
                this.securityUtil = securityUtil;
        }

        @PostMapping("/auth/login")
        @ApiMessage("Đăng nhập thành công")
        public ResponseEntity<ResLoginDTO> login(@RequestBody LoginDTO loginDTO) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                                loginDTO.getEmail(), loginDTO.getPassword());
                // xác thực người dùng => cần viết hàm loadUserByUsername
                Authentication authentication = authenticationManagerBuilder
                                .getObject()
                                .authenticate(authenticationToken);
                // set info người dùng vào context (có thể sử dụng sau này)
                SecurityContextHolder.getContext().setAuthentication(authentication);
                String email = loginDTO.getEmail();
                User user = userService.getUserByEmail(email);
                Role role = user.getRole();
                String accessToken = securityUtil.createAccessToken(email, role);
                String refreshToken = securityUtil.createRefreshToken(email, role);
                ResLoginDTO resLoginDTO = new ResLoginDTO();
                resLoginDTO.setAccessToken(accessToken);
                resLoginDTO.setRefreshToken(refreshToken);

                // update user
                this.userService.updateUserToken(refreshToken, loginDTO.getEmail());
                // set cookie
                ResponseCookie resCookie = ResponseCookie.from("refresh_token", refreshToken)
                                .httpOnly(true)
                                .secure(true)
                                .path("/")
                                .maxAge(refreshTokenExpiration)
                                .build();

                return ResponseEntity.ok()
                                .header(HttpHeaders.SET_COOKIE, resCookie.toString())
                                .body(resLoginDTO);
        }

        @PostMapping("/auth/register")
        public String register(@RequestBody LoginDTO loginDTO) {
                if (userService.isEmailExist(loginDTO.getEmail())) {
                        throw new ResourceNotFoundException("Email đã tồn tại");
                }
                return userService.handleCreateUser(loginDTO);
        }

        @GetMapping("/auth/refresh")
        public ResponseEntity<ResLoginDTO> getRefreshToken(
                        @CookieValue(name = "refresh_token", defaultValue = "default_Value") String refresh_token) {
                if (refresh_token.equals("default_Value")) {
                        throw new ResourceNotFoundException(
                                        "Token không hợp lệ");
                }
                Jwt decodedToken = this.securityUtil.checkValidRefreshToken(
                                refresh_token);
                String email = decodedToken.getSubject();
                User currentUser = this.userService.getUserByRefreshTokenAndEmail(
                                refresh_token,
                                email);
                if (currentUser == null) {
                        throw new ResourceNotFoundException("Refresh token không hợp lệ");
                }

                User user = userService.getUserByEmail(email);
                Role role = user.getRole();
                String accessToken = securityUtil.createAccessToken(email, role);
                String refreshToken = securityUtil.createRefreshToken(email, role);
                ResLoginDTO resLoginDTO = new ResLoginDTO();
                resLoginDTO.setAccessToken(accessToken);
                resLoginDTO.setRefreshToken(refreshToken);

                // update user
                this.userService.updateUserToken(refreshToken, email);
                // set cookie
                ResponseCookie resCookie = ResponseCookie.from("refresh_token", refreshToken)
                                .httpOnly(true)
                                .secure(true)
                                .path("/")
                                .maxAge(refreshTokenExpiration)
                                .build();

                return ResponseEntity.ok()
                                .header(HttpHeaders.SET_COOKIE, resCookie.toString())
                                .body(resLoginDTO);
        }
}
