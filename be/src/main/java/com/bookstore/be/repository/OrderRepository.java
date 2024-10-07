package com.bookstore.be.repository;

import com.bookstore.be.dto.response.statistics.RevenueStatistics;
import com.bookstore.be.dto.response.statistics.RevenueStatisticsByDate;
import com.bookstore.be.dto.response.statistics.RevenueStatisticsByMonthAndYear;
import com.bookstore.be.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
    List<Order> findAllByUserId(Long userId);
    @Query("SELECT new com.bookstore.be.dto.response.statistics.RevenueStatistics(YEAR(o.createdAt), SUM(o.totalPrice)) " +
            "FROM Order o " +
            "GROUP BY YEAR ( o.createdAt) ORDER BY YEAR ( o.createdAt)")
    List<RevenueStatistics> findRevenueStatisticsByYear();

    @Query("SELECT new com.bookstore.be.dto.response.statistics.RevenueStatisticsByDate(DATE(o.createdAt), SUM(o.totalPrice)) " +
            "FROM Order o " +
            "GROUP BY DATE (o.createdAt) " +
            "ORDER BY DATE (o.createdAt)")
    List<RevenueStatisticsByDate> findRevenueStatisticsByDay();

    @Query("SELECT sum(o.totalPrice) from Order o")
    Double findTotalPrice();

    @Query("SELECT new com.bookstore.be.dto.response.statistics.RevenueStatisticsByMonthAndYear(CONCAT(FUNCTION('LPAD', CAST(MONTH(o.createdAt) AS STRING), 2, '0'), '-', YEAR(o.createdAt)), SUM(o.totalPrice)) " +
            "FROM Order o " +
            "GROUP BY YEAR(o.createdAt), MONTH(o.createdAt), CONCAT(FUNCTION('LPAD', CAST(MONTH(o.createdAt) AS STRING), 2, '0'), '-', YEAR(o.createdAt)) " +
            "ORDER BY YEAR(o.createdAt), MONTH(o.createdAt)")
    List<RevenueStatisticsByMonthAndYear> findRevenueStatisticsByMonthAndYear();


}