package com.bookstore.be.dto.request.category;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;


@Getter
public class CategoryCreateRequestDTO {
    @NotBlank
    String name;
    String imageUrl;
}
