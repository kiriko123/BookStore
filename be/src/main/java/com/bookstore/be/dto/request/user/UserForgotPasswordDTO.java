package com.bookstore.be.dto.request.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class UserForgotPasswordDTO {
    @NotBlank
    @Email
    private String email;
}
