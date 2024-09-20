package com.bookstore.be.dto.request.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChangePasswordDTO {
    @Email
    @NotBlank
    String email;
    @NotBlank
    String password;
    @NotBlank
    String newPassword;
    @NotBlank
    String confirmPassword;
}
