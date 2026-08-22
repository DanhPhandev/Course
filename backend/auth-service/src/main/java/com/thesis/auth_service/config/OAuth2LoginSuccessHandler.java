package com.thesis.auth_service.config;

import java.io.IOException;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.thesis.auth_service.model.User;
import com.thesis.auth_service.repository.UserRepository;
import com.thesis.auth_service.service.RoleService;
import com.thesis.auth_service.service.SecurityUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuth2LoginSuccessHandler
                extends SimpleUrlAuthenticationSuccessHandler {
        private final RoleService roleService;
        private final UserRepository userRepository;
        private final SecurityUtil securityUtil;

        public OAuth2LoginSuccessHandler(
                        UserRepository userRepository,
                        SecurityUtil securityUtil, RoleService roleService) {

                this.userRepository = userRepository;
                this.securityUtil = securityUtil;
                this.roleService = roleService;
        }

        @Override
        public void onAuthenticationSuccess(
                        HttpServletRequest request,
                        HttpServletResponse response,
                        Authentication authentication)
                        throws IOException {

                OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;

                String provider = oauthToken
                                .getAuthorizedClientRegistrationId();

                Map<String, Object> attributes = oauthToken
                                .getPrincipal()
                                .getAttributes();

                String email = (String) attributes.get("email");

                String name = (String) attributes.get("name");
                // if ("google".equals(provider)) {
                // providerId = String.valueOf(
                // attributes.get("sub"));
                // }
                String providerId = String.valueOf(
                                attributes.get("sub"));
                if (userRepository.existsByEmail(email)) {
                        User newUser = new User();
                        newUser.setProviderId(providerId);
                        userRepository.save(newUser);
                } else {
                        User newUser = new User();
                        newUser.setEmail(email);
                        newUser.setFullName(name);
                        newUser.setRole(roleService.getRoleById(1));
                        newUser.setProviderId(providerId);
                        userRepository.save(newUser);
                }
                // "108515615171164843310"

                // 1. tìm UserIdentity
                // 2. nếu chưa có -> tạo/link User
                // 3. tạo accessToken
                // 4. tạo refreshToken
                // 5. redirect về frontend
                response.sendRedirect(
                                "http://localhost:3000");
        }
}
