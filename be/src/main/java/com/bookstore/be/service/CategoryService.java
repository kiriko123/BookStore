package com.bookstore.be.service;

import com.bookstore.be.dto.request.category.CategoryCreateRequestDTO;
import com.bookstore.be.dto.request.category.CategoryUpdateRequestDTO;
import com.bookstore.be.dto.response.ResultPaginationResponse;
import com.bookstore.be.dto.response.category.CategoryResponse;
import com.bookstore.be.model.Category;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface CategoryService {
    CategoryResponse create(CategoryCreateRequestDTO categoryCreateRequestDTO);
    CategoryResponse update(CategoryUpdateRequestDTO categoryUpdateRequestDTO);
    void delete(Long id);
    ResultPaginationResponse getAllCategories(Specification<Category> specification, Pageable pageable);
    Category getCategoryById(Long id);
    List<CategoryResponse> getAll();
}
