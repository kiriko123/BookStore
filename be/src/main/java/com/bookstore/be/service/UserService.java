package com.bookstore.be.service;

import com.bookstore.be.dto.request.user.AdminBulkCreateUserDTO;
import com.bookstore.be.dto.request.user.AdminCreateUserDTO;
import com.bookstore.be.dto.request.user.AdminUpdateUserDTO;
import com.bookstore.be.dto.response.ResultPaginationResponse;
import com.bookstore.be.dto.response.user.UserResponse;
import com.bookstore.be.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface UserService {
    UserResponse save(AdminCreateUserDTO adminCreateUserDTO);
    UserResponse update(AdminUpdateUserDTO adminUpdateUserDTO);
    void delete(Long id);
    ResultPaginationResponse findAll(Specification<User> spec, Pageable pageable);
    User findById(Long id);
    User findByEmail(String email);
    void updateUserToken(String token, String email);
    User getUserByEmailAndRefreshToken(String email, String refreshToken);
    String bulkCreateUser(List<AdminBulkCreateUserDTO> adminBulkCreateUserDTOS);
    long countAllUser();
    String getRefreshTokenByEmail(String email);
}
