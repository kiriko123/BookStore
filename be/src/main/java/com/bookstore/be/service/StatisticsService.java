package com.bookstore.be.service;

import com.bookstore.be.dto.response.statistics.*;

import java.util.List;

public interface StatisticsService {
    CountAllUserOrderAndTotalPriceResponse countAllUserAndOrder();
    List<RevenueStatistics> revenueStatistics();
    List<RevenueStatisticsByDate> revenueStatisticsByDate();
    List<CountBookSold> countBookSold();
    List<RevenueStatisticsByMonthAndYear> findRevenueStatisticsByMonthAndYear();
    List<CategoryBookCount> categoryBookCount();
    List<CountUserOrder> countUserOrder();
}
