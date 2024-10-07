package com.bookstore.be.model;

import com.bookstore.be.util.SecurityUtil;
import com.bookstore.be.util.constant.GenderEnum;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String firstName;
    String name;

    String password;
    String email;

    @Column(columnDefinition = "MEDIUMTEXT")
    String refreshToken;

    @Column(name = "verification_code")
    String verificationCode;
    @Column(name = "verification_expiration")
    LocalDateTime verificationCodeExpiresAt;
    boolean enabled;

    String imageUrl;

    @Enumerated(EnumType.STRING)
    GenderEnum gender;

    int age;
    String phoneNumber;
    String address;

    Instant createdAt;
    Instant updatedAt;
    String createdBy;
    String updatedBy;

    boolean googleAccount = false;

    @PrePersist
    public void handleBeforeCreate() {
        this.createdBy = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        this.createdAt = Instant.now();
    }

    @PreUpdate
    public void handleBeforeUpdate() {
        this.updatedAt = Instant.now();
        this.updatedBy = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
    }

    @ManyToOne
    @JoinColumn(name = "role_id")
    Role role;
}
