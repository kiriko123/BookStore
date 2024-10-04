package com.bookstore.be.service.impl;

import com.bookstore.be.dto.response.statistics.CountAllUserOrderAndTotalPriceResponse;
import com.bookstore.be.dto.response.statistics.CountBookSold;
import com.bookstore.be.dto.response.statistics.RevenueStatistics;
import com.bookstore.be.dto.response.statistics.RevenueStatisticsByDate;
import com.bookstore.be.model.Book;
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
    public CountAllUserOrderAndTotalPriceResponse countAllUserAndOrder() {

        return CountAllUserOrderAndTotalPriceResponse.builder()
                .totalUser(userRepository.count())
                .totalOrder(orderRepository.count())
                .totalPrice(orderRepository.findTotalPrice())
                .build();
    }

    @Override
    public List<RevenueStatistics> revenueStatistics() {
        return orderRepository.findRevenueStatisticsByYear();
    }

    @Override
    public List<RevenueStatisticsByDate> revenueStatisticsByDate() {
        return orderRepository.findRevenueStatisticsByDay();
    }

    @Override
    public List<CountBookSold> countBookSold() {
        List<Book> books = bookRepository.findAll();

        return books.stream().map(b -> {
            return CountBookSold.builder()
                    .name(b.getName())
                    .soldQuantity(b.getSoldQuantity())
                    .build();
        }).toList();
    }

}
