package com.bookstore.be.dto.request.user;

import com.bookstore.be.util.annotation.PhoneNumber;
import com.bookstore.be.util.constant.GenderEnum;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateInfoDTO {
    @NotNull
    @Min(1)
    long id;
    @NotBlank
    String firstName;
    @NotBlank
    String name;
    String imageUrl;
    GenderEnum gender;
    @Min(1)
    int age;
    @PhoneNumber
    @NotBlank
    String phoneNumber;
    @NotBlank
    String address;
}
