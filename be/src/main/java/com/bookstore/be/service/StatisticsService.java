package com.bookstore.be.service;

import com.bookstore.be.dto.response.statistics.CountAllUserOrderAndTotalPriceResponse;
import com.bookstore.be.dto.response.statistics.CountBookSold;
import com.bookstore.be.dto.response.statistics.RevenueStatistics;
import com.bookstore.be.dto.response.statistics.RevenueStatisticsByDate;

import java.util.List;

public interface StatisticsService {
    CountAllUserOrderAndTotalPriceResponse countAllUserAndOrder();
    List<RevenueStatistics> revenueStatistics();
    List<RevenueStatisticsByDate> revenueStatisticsByDate();
    List<CountBookSold> countBookSold();
}
