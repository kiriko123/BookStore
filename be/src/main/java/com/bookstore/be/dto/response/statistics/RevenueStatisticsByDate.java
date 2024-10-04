package com.bookstore.be.dto.response.statistics;

import lombok.Getter;
import lombok.Setter;

import java.util.Date; // Import java.util.Date

@Getter
@Setter
public class RevenueStatisticsByDate {

    private Date date;
    private Double totalRevenue;

    public RevenueStatisticsByDate(Date date, Double totalRevenue) {
        this.date = date;
        this.totalRevenue = totalRevenue;
    }
}