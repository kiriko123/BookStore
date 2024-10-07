package com.bookstore.be.service.impl;

import com.bookstore.be.dto.response.statistics.*;
import com.bookstore.be.model.Book;
import com.bookstore.be.repository.BookRepository;
import com.bookstore.be.repository.CategoryRepository;
import com.bookstore.be.repository.OrderRepository;
import com.bookstore.be.repository.UserRepository;
import com.bookstore.be.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;

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

    @Override
    public List<RevenueStatisticsByMonthAndYear> findRevenueStatisticsByMonthAndYear() {
        return orderRepository.findRevenueStatisticsByMonthAndYear();
    }

    @Override
    public List<CategoryBookCount> categoryBookCount() {
        List<Object[]> objects = categoryRepository.countBooksByCategory();

        return objects.stream().map(o -> new CategoryBookCount((String) o[0], ((Number) o[1]).longValue()))
                .toList();
    }

    @Override
    public List<CountUserOrder> countUserOrder() {
        List<Object[]> objects = userRepository.countUserOrder();

        return objects.stream().map(o -> new CountUserOrder((String) o[0], ((Number) o[1]).longValue())).toList();
    }

}
