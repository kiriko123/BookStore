package com.bookstore.be.dto.request.category;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;


@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryCreateRequestDTO {
    @NotBlank
    String name;
}
