package com.bookstore.be.service.impl;

import com.bookstore.be.dto.response.RevenueStatistics;
import com.bookstore.be.dto.response.statistics.CountAllUserOrderAndBookResponse;
import com.bookstore.be.repository.BookRepository;
import com.bookstore.be.repository.OrderRepository;
import com.bookstore.be.repository.UserRepository;
import com.bookstore.be.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;

    @Override
    public CountAllUserOrderAndBookResponse countAllUserAndOrder() {

        return CountAllUserOrderAndBookResponse.builder()
                .totalUser(userRepository.count())
                .totalOrder(orderRepository.count())
                .totalBook(bookRepository.count())
                .build();
    }

    @Override
    public List<RevenueStatistics> revenueStatistics() {
        return orderRepository.findRevenueStatisticsByYear();
    }

}
