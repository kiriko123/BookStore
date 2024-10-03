package com.bookstore.be.dto.response.statistics;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CountAllUserOrderAndBookResponse {
    long totalUser;
    long totalOrder;
    long totalBook;
}
