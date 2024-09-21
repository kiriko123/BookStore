package com.bookstore.be.dto.response.book;

import com.bookstore.be.model.Book;
import com.bookstore.be.model.Category;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Builder
public class BookResponse {
    long id;

    String name;

    String author;

    float price;

    int quantity;

    int soldQuantity;

    String thumbnail;

    List<String> sliders;

    Category category;

    Instant createdAt;
    Instant updatedAt;
    String createdBy;
    String updatedBy;
    boolean active;

    public static BookResponse from(Book book) {
        return BookResponse.builder()
                .id(book.getId())
                .name(book.getName())
                .author(book.getAuthor())
                .price(book.getPrice())
                .quantity(book.getQuantity())
                .soldQuantity(book.getSoldQuantity())
                .thumbnail(book.getThumbnail())
                .sliders(book.getSliders())
                .category(book.getCategory())
                .createdAt(book.getCreatedAt())
                .updatedAt(book.getUpdatedAt())
                .createdBy(book.getCreatedBy())
                .updatedBy(book.getUpdatedBy())
                .active(book.isActive())
                .build();
    }
}
