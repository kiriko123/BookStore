package com.bookstore.be.service;

import com.bookstore.be.dto.request.order.OrderCreateDTO;
import com.bookstore.be.dto.response.ResultPaginationResponse;
import com.bookstore.be.dto.response.order.OrderResponse;
import com.bookstore.be.model.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface OrderService {
    Order createOrder(OrderCreateDTO orderCreateDTO);
    List<OrderResponse> getOrdersByUserId(Long id);
    ResultPaginationResponse findAll(Specification<Order> spec, Pageable pageable);
    List<OrderResponse> getAll();
}
