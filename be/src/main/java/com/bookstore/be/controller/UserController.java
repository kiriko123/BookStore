package com.bookstore.be.controller;

import com.bookstore.be.dto.request.user.AdminBulkCreateUserDTO;
import com.bookstore.be.dto.request.user.AdminCreateUserDTO;
import com.bookstore.be.dto.request.user.AdminUpdateUserDTO;
import com.bookstore.be.dto.response.RestResponse;
import com.bookstore.be.model.User;
import com.bookstore.be.service.UserService;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/user")
@Validated
public class UserController {
    private final UserService userService;

    @PutMapping
    public ResponseEntity<?> updateUser(@Valid @RequestBody AdminUpdateUserDTO adminUpdateUserDTO) {
        log.info("updateUser: {}", adminUpdateUserDTO);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.update(adminUpdateUserDTO));
    }
    @GetMapping
    public ResponseEntity<?> getAllUsers(@Filter Specification<User> specification, Pageable pageable) {
        log.info("getAllUsers: {}", specification);
        return ResponseEntity.ok().body(userService.findAll(specification, pageable));
    }
    @DeleteMapping("/{id}")
    public RestResponse<?> deleteUser(@Min(1)@PathVariable Long id) {
        log.info("deleteUser: {}", id);
        userService.delete(id);
        return RestResponse.builder()
                .statusCode(204)
                .message("User deleted")
                .build();
    }
    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody AdminCreateUserDTO adminCreateUserDTO) {
        log.info("createUser: {}", adminCreateUserDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(adminCreateUserDTO));
    }
    @PostMapping("/bulk-create")
    public RestResponse<?> createUsers(@RequestBody List<AdminBulkCreateUserDTO> adminBulkCreateUserDTOS) {
        log.info("createUsers: {}", adminBulkCreateUserDTOS);
        String res = userService.bulkCreateUser(adminBulkCreateUserDTOS);
        return RestResponse.builder()
                .statusCode(201)
                .message("Users created")
                .data(res)
                .build();
    }
}
