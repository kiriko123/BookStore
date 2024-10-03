package com.bookstore.be.repository;

import com.bookstore.be.dto.response.RevenueStatistics;
import com.bookstore.be.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
    List<Order> findAllByUserId(Long userId);

    @Query("SELECT new com.bookstore.be.dto.response.RevenueStatistics(YEAR(o.createdAt), SUM(o.totalPrice)) " +
            "FROM Order o " +
            "GROUP BY YEAR ( o.createdAt) ORDER BY YEAR ( o.createdAt)")
    List<RevenueStatistics> findRevenueStatisticsByYear();
}
