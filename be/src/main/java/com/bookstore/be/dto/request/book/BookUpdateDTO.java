package com.bookstore.be.dto.request.book;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
@Getter
@Builder
public class BookUpdateDTO {
    @Min(1)
    long id;

    @NotBlank
    String name;

    @NotBlank
    String author;

    @Min(1)
    float price;

    @Min(0)
    int quantity;

    @Min(0)
    int soldQuantity;

    String thumbnail;

    @NotBlank
    String categoryName;

    boolean active;

    List<String> sliders;
}
