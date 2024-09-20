package com.bookstore.be.dto.response.category;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryResponse {
    Long id;
    String name;
    String imageUrl;
    Instant createdAt;
    Instant updatedAt;
    String createdBy;
    String updatedBy;
    boolean active;
}
