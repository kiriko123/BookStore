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

    @GetMapping("/count-all-user-order-and-book")
    public ResponseEntity<?> countAllUserOrderAndBook() {
        log.info("count-all-user-order-and-book");
        return ResponseEntity.ok(statisticsService.countAllUserAndOrder());
    }

    @GetMapping("/revenueStatistics")
    public ResponseEntity<?> revenueStatistics() {
        log.info("revenueStatistics");
        return ResponseEntity.ok(statisticsService.revenueStatistics());
    }
}
