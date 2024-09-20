package com.bookstore.be.mapper;

import com.bookstore.be.dto.request.category.CategoryCreateRequestDTO;
import com.bookstore.be.dto.request.category.CategoryUpdateRequestDTO;
import com.bookstore.be.dto.response.category.CategoryResponse;
import com.bookstore.be.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapping {
    Category fromCategoryCreateRequestDTOToCategory(CategoryCreateRequestDTO categoryCreateRequestDTO);
//    Category fromCategoryUpdateRequestDTOToCategory(CategoryUpdateRequestDTO categoryUpdateRequestDTO);
    void updateCategory(@MappingTarget Category category, CategoryUpdateRequestDTO categoryUpdateRequestDTO);
    CategoryResponse fromCategoryToCategoryResponse(Category category);
}
