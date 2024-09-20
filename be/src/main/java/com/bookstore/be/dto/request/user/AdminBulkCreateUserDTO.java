package com.bookstore.be.dto.request.user;

import com.bookstore.be.util.constant.GenderEnum;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdminBulkCreateUserDTO {

    private String name;

    private String firstName;

    private String email;

    private String password;

    private int age;

    private GenderEnum gender;

    private String address;

    private String phoneNumber;
}
