package com.bookstore.be.controller;

import com.bookstore.be.dto.request.order.OrderCreateDTO;
import com.bookstore.be.service.OrderService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@Validated
@RequestMapping("/api/v1/order")
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@Valid @RequestBody OrderCreateDTO orderCreateDTO) {
        log.info("Create order: {}", orderCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(orderCreateDTO));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@Min(1)@PathVariable Long id) {
        log.info("Get order by id: {}", id);
        return ResponseEntity.ok(orderService.getOrdersByUserId(id));
    }
}
