package com.bookstore.be.repository;

import com.bookstore.be.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface UserRepository extends JpaRepository<User, Long> , JpaSpecificationExecutor<User> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
    User findByEmailAndRefreshToken(String email, String refreshToken);
    User findByVerificationCode(String verificationCode);

    @Query(value = "select users.email, count(orders.id) from users " +
            "join orders where users.id = orders.user_id " +
            "group by users.id", nativeQuery = true)
    List<Object[]> countUserOrder();
}
