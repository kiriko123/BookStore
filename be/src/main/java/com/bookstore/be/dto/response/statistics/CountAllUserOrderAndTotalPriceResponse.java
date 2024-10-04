package com.bookstore.be.dto.response.statistics;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CountAllUserOrderAndTotalPriceResponse {
    long totalUser;
    long totalOrder;
    Double totalPrice;
}
