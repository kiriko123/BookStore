package com.bookstore.be.dto.response.statistics;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RevenueStatistics {

    private int year;
    private Double totalRevenue;

    public RevenueStatistics(int year, Double totalRevenue) {
        this.year = year;
        this.totalRevenue = totalRevenue;
    }


}