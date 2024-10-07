package com.bookstore.be.dto.response.user;

import com.bookstore.be.model.User;
import com.bookstore.be.util.constant.GenderEnum;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.Instant;

@Getter
@Builder
@Setter
public class UserResponse implements Serializable {

    private long id;

    private String name;

    private String firstName;

    private String email;

    private String address;

    private int age;

    private GenderEnum gender;

    private String phoneNumber;

    private boolean enabled;

    private String imageUrl;

    private Instant createdAt;

    private Instant updatedAt;

    private String createdBy;
    private String updatedBy;
    private boolean googleAccount;
    private Role role;

    public static UserResponse fromUserToUserResponse(User user) {

        UserResponse userResponse =  UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .age(user.getAge())
                .address(user.getAddress())
                .gender(user.getGender())
                .phoneNumber(user.getPhoneNumber())
                .enabled(user.isEnabled())
                .imageUrl(user.getImageUrl())
                .googleAccount(user.isGoogleAccount())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .createdBy(user.getCreatedBy())
                .updatedBy(user.getUpdatedBy())
                .build();

        if (user.getRole() != null) {
            userResponse.setRole(Role.builder()
                    .id(user.getRole().getId())
                    .name(user.getRole().getName())
                    .build());
        }else{
            userResponse.setRole(null);
        }
        return userResponse;

    }
    @Getter
    @Setter
    @Builder
    public static class Role{
        private long id;
        private String name;
    }
}
