package com.bookstore.be.service;

import com.bookstore.be.dto.response.RevenueStatistics;
import com.bookstore.be.dto.response.statistics.CountAllUserOrderAndBookResponse;

import java.util.List;

public interface StatisticsService {
    CountAllUserOrderAndBookResponse countAllUserAndOrder();
    List<RevenueStatistics> revenueStatistics();
}
