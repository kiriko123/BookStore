package com.bookstore.be.dto.response.order;
import com.bookstore.be.model.Order;
import com.bookstore.be.model.OrderDetail;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {

    long id;

    String receiverName;
    String receiverPhone;
    String receiverAddress;
    float totalPrice;

    User user;

    Instant createdAt;
    Instant updatedAt;
    String createdBy;
    String updatedBy;

    List<OrderDetailResponse> orderDetails;

    @Getter
    @Setter
    @Builder
    public static class User{
        Long id;
        String email;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderDetailResponse{
        long id;
        String bookName;
        float price;
        int quantity;

        public static OrderDetailResponse fromOrderDetail(OrderDetail orderDetail) {
            return OrderDetailResponse.builder()
                    .id(orderDetail.getId())
                    .bookName(orderDetail.getBookName())
                    .price(orderDetail.getPrice())
                    .quantity(orderDetail.getQuantity())
                    .build();
        }
    }
    public static OrderResponse fromOrder(Order order, List<OrderDetailResponse> orderDetails) {
        return OrderResponse.builder()
                .id(order.getId())
                .receiverName(order.getReceiverName())
                .receiverPhone(order.getReceiverPhone())
                .receiverAddress(order.getReceiverAddress())
                .totalPrice(order.getTotalPrice())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .createdBy(order.getCreatedBy())
                .updatedBy(order.getUpdatedBy())
                .user(
                        User.builder()
                                .id(order.getUser().getId())
                                .email(order.getUser().getEmail())
                                .build()
                )
                .orderDetails(orderDetails)
                .build();
    }
}
