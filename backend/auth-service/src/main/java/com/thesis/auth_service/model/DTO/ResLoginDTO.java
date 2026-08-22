package com.thesis.auth_service.model.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResLoginDTO {
    private String accessToken;
    private String refreshToken;

}
