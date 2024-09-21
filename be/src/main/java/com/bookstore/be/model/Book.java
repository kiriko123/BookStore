package com.bookstore.be.model;

import com.bookstore.be.util.SecurityUtil;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String name;

    String author;

    float price;

    int quantity;

    int soldQuantity;

    String thumbnail;

    @ElementCollection
    @CollectionTable(name = "book_sliders", joinColumns = @JoinColumn(name = "book_id"))
    @Column(name = "slider_url")
    List<String> sliders;

    @ManyToOne
    @JoinColumn(name = "category_id")
    Category category;

    Instant createdAt;
    Instant updatedAt;
    String createdBy;
    String updatedBy;
    boolean active;

    @PrePersist
    public void handleBeforeCreate() {
        this.createdBy = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        this.createdAt = Instant.now();
    }

    @PreUpdate
    public void handleBeforeUpdate() {
        this.updatedAt = Instant.now();
        this.updatedBy = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
    }
}
