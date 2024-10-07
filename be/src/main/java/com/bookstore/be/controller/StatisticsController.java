package com.bookstore.be.controller;

import com.bookstore.be.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@Validated
@RequestMapping("/api/v1/statistics")
public class StatisticsController {
    private final StatisticsService statisticsService;

    @GetMapping("/count-all-user-order-and-total-price")
    public ResponseEntity<?> countAllUserOrderAndTotalPrice() {
        log.info("count-all-user-order-and-total-price");
        return ResponseEntity.ok(statisticsService.countAllUserAndOrder());
    }

    @GetMapping("/revenueStatistics")
    public ResponseEntity<?> revenueStatistics() {
        log.info("revenueStatistics");
        return ResponseEntity.ok(statisticsService.revenueStatistics());
    }

    @GetMapping("/revenue-statistics-by-date")
    public ResponseEntity<?> revenueStatisticsByDate() {
        log.info("revenue-statistics-by-date");
        return ResponseEntity.ok(statisticsService.revenueStatisticsByDate());
    }
    @GetMapping("/count-book-sold")
    public ResponseEntity<?> countBookSold() {
        log.info("count-book-sold");
        return ResponseEntity.ok(statisticsService.countBookSold());
    }
    @GetMapping("/find-revenue-statistics-by-month-and-year")
    public ResponseEntity<?> findRevenueStatisticsByMonthAndYear() {
        log.info("find-revenue-statistics-by-month-and-year");
        return ResponseEntity.ok(statisticsService.findRevenueStatisticsByMonthAndYear());
    }
    @GetMapping("/category-book-count")
    public ResponseEntity<?> categoryBookCount() {
        log.info("category-book-count");
        return ResponseEntity.ok(statisticsService.categoryBookCount());
    }
    @GetMapping("/count-user-order")
    public ResponseEntity<?> countUserOrder() {
        log.info("count-user-order");
        return ResponseEntity.ok(statisticsService.countUserOrder());
    }
}
