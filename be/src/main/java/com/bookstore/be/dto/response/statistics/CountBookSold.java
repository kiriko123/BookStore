package com.bookstore.be.dto.response.statistics;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CountBookSold {
    private String name;
    private int soldQuantity;
}
