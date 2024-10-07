package com.bookstore.be.dto.request.order;

import com.bookstore.be.util.annotation.PhoneNumber;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderCreateDTO {
    @NotBlank
    String receiverName;
    @PhoneNumber
    @NotBlank
    String receiverPhone;
    @NotBlank
    String receiverAddress;

    float totalPrice;

    long userId;

    List<OderDetail> orderDetails;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OderDetail {
        @NotBlank
        String bookName;

        @NotNull
        @Min(1)
        float price;

        @Min(1)
        long bookId;

        @Min(1)
        int quantity;

    }
}
