package com.bookstore.be.service.impl;

import com.bookstore.be.dto.request.order.OrderCreateDTO;
import com.bookstore.be.dto.response.ResultPaginationResponse;
import com.bookstore.be.dto.response.book.BookResponse;
import com.bookstore.be.dto.response.order.OrderResponse;
import com.bookstore.be.exception.ResourceNotFoundException;
import com.bookstore.be.model.Order;
import com.bookstore.be.model.OrderDetail;
import com.bookstore.be.repository.BookRepository;
import com.bookstore.be.repository.OrderDetailRepository;
import com.bookstore.be.repository.OrderRepository;
import com.bookstore.be.repository.UserRepository;
import com.bookstore.be.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final OrderDetailRepository orderDetailRepository;

    @Override
    public Order createOrder(OrderCreateDTO orderCreateDTO) {
        // Check if user exists before proceeding
        var user = userRepository.findById(orderCreateDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Validate all books and stock levels first
        var bookMap = orderCreateDTO.getOrderDetails().stream().collect(
                java.util.stream.Collectors.toMap(
                        detail -> detail.getBookId(),
                        detail -> bookRepository.findById(detail.getBookId())
                                .orElseThrow(() -> new ResourceNotFoundException("Book with id " + detail.getBookId() + " does not exist"))
                )
        );

        // Check stock levels
        orderCreateDTO.getOrderDetails().forEach(detail -> {
            var book = bookMap.get(detail.getBookId());
            if (book.getQuantity() < detail.getQuantity()) {
                throw new IllegalStateException("Insufficient stock for book: " + book.getName());
            }
        });

        // If all validations pass, reduce stock quantities
        orderCreateDTO.getOrderDetails().forEach(detail -> {
            var book = bookMap.get(detail.getBookId());
            book.setQuantity(book.getQuantity() - detail.getQuantity());
            book.setSoldQuantity(book.getSoldQuantity() + detail.getQuantity());
            bookRepository.save(book); // Save the updated book quantity
        });

        // Create the order
        Order order = orderRepository.save(Order.builder()
                .receiverName(orderCreateDTO.getReceiverName())
                .receiverAddress(orderCreateDTO.getReceiverAddress())
                .receiverPhone(orderCreateDTO.getReceiverPhone())
                .totalPrice(orderCreateDTO.getTotalPrice())
                .user(user)
                .build());

        // Create the order details
        orderCreateDTO.getOrderDetails().forEach(detail -> {
            orderDetailRepository.save(
                    OrderDetail.builder()
                            .book(bookMap.get(detail.getBookId()))
                            .order(order)
                            .bookName(detail.getBookName())
                            .price(detail.getPrice())
                            .quantity(detail.getQuantity())
                            .build()
            );
        });

        return order;
    }

    @Override
    public List<OrderResponse> getOrdersByUserId(Long id) {
        if(!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found");
        }
        List<Order> orders =  orderRepository.findAllByUserId(id);

        return orders.stream()
                .map(order -> {
                    List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrderId(order.getId());

                    List<OrderResponse.OrderDetailResponse> orderDetailResponses = orderDetails.stream()
                            .map(OrderResponse.OrderDetailResponse::fromOrderDetail)
                            .toList();

                    return OrderResponse.fromOrder(order, orderDetailResponses);
                })
                .toList();

    }

    @Override
    public ResultPaginationResponse findAll(Specification<Order> spec, Pageable pageable) {
        // Tìm tất cả các đơn hàng dựa trên Specification và Pageable
        Page<Order> orders = orderRepository.findAll(spec, pageable);

        // Tạo metadata cho phân trang
        ResultPaginationResponse.Meta meta = ResultPaginationResponse.Meta.builder()
                .total(orders.getTotalElements())
                .pages(orders.getTotalPages())
                .page(pageable.getPageNumber() + 1)  // Trang hiện tại
                .pageSize(pageable.getPageSize())    // Số phần tử trên mỗi trang
                .build();

        // Chuyển đổi từng Order sang OrderResponse kèm theo OrderDetailResponse
        List<OrderResponse> orderResponses = orders.getContent().stream()
                .map(order -> {
                    // Lấy các OrderDetail của Order hiện tại
                    List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrderId(order.getId());

                    // Chuyển đổi từng OrderDetail sang OrderDetailResponse
                    List<OrderResponse.OrderDetailResponse> orderDetailResponses = orderDetails.stream()
                            .map(OrderResponse.OrderDetailResponse::fromOrderDetail)
                            .toList();

                    // Tạo OrderResponse từ Order và danh sách OrderDetailResponse
                    return OrderResponse.fromOrder(order, orderDetailResponses);
                })
                .toList();

        // Trả về kết quả phân trang kèm theo danh sách các OrderResponse
        return ResultPaginationResponse.builder()
                .meta(meta)
                .result(orderResponses)  // Kết quả các đơn hàng
                .build();
    }

    @Override
    public List<OrderResponse> getAll() {
        List<Order> orders =  orderRepository.findAll();

        return orders.stream()
                .map(order -> {
                    List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrderId(order.getId());

                    List<OrderResponse.OrderDetailResponse> orderDetailResponses = orderDetails.stream()
                            .map(OrderResponse.OrderDetailResponse::fromOrderDetail)
                            .toList();

                    return OrderResponse.fromOrder(order, orderDetailResponses);
                })
                .toList();
    }

}

