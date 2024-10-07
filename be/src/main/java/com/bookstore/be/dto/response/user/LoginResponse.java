package com.bookstore.be.dto.response.user;

import com.bookstore.be.model.Role;
import com.bookstore.be.util.constant.GenderEnum;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serializable;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse implements Serializable {
    @JsonProperty("access_token")
    private String accessToken;

    private UserLogin user;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserLogin implements Serializable {
        private long id;
        private String email;
        private String name;
        private String imageUrl;
        private String firstName;
        private int age;
        private String phoneNumber;
        private String address;
        private GenderEnum gender;
        private Role role;
        private boolean googleAccount = false;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserGetAccount {
        private UserLogin user;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserInsideToken {
        private long id;
        private String email;
        private String name;
    }
}