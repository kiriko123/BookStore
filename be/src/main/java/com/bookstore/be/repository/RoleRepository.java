package com.bookstore.be.repository;

import com.bookstore.be.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    boolean existsByName(String name);
    Role findByName(String name);
}
