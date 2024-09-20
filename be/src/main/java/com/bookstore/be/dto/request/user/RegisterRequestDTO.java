package com.bookstore.be.dto.request.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;

@Getter
@Builder
public class RegisterRequestDTO implements Serializable {
    @NotBlank
    private String name;
    @NotBlank
    private String firstName;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String confirmPassword;
}
