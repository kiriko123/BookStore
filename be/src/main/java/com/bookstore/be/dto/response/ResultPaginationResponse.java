package com.bookstore.be.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResultPaginationResponse {
    private Meta meta;
    private Object result;

    @Getter
    @Setter
    @Builder
    public static class Meta{
        private int page;
        private int pageSize;
        private int pages;
        private long total;
    }
}
