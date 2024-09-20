package com.bookstore.be.service.impl;

import com.bookstore.be.dto.request.category.CategoryCreateRequestDTO;
import com.bookstore.be.dto.request.category.CategoryUpdateRequestDTO;
import com.bookstore.be.dto.response.ResultPaginationResponse;
import com.bookstore.be.dto.response.category.CategoryResponse;
import com.bookstore.be.exception.InvalidDataException;
import com.bookstore.be.exception.ResourceNotFoundException;
import com.bookstore.be.mapper.CategoryMapping;
import com.bookstore.be.model.Category;
import com.bookstore.be.repository.CategoryRepository;
import com.bookstore.be.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapping categoryMapping;

    @Override
    public CategoryResponse create(CategoryCreateRequestDTO categoryCreateRequestDTO) {
        if(categoryRepository.existsByName(categoryCreateRequestDTO.getName())) {
            throw new InvalidDataException("Category name already exist");
        }
        Category category = categoryMapping.fromCategoryCreateRequestDTOToCategory(categoryCreateRequestDTO);
        category.setActive(true);
        return categoryMapping.fromCategoryToCategoryResponse(categoryRepository.save(category));
    }

    @Override
    public CategoryResponse update(CategoryUpdateRequestDTO categoryUpdateRequestDTO) {
        Category category = getCategoryById(categoryUpdateRequestDTO.getId());

        if(!category.getName().equals(categoryUpdateRequestDTO.getName())) {
            if(categoryRepository.existsByName(categoryUpdateRequestDTO.getName())) {
                throw new InvalidDataException("Category name already exist");
            }
        }

        categoryMapping.updateCategory(category, categoryUpdateRequestDTO);
        return categoryMapping.fromCategoryToCategoryResponse(categoryRepository.save(category));
    }

    @Override
    public void delete(Long id) {
        Category category = getCategoryById(id);
        category.setActive(false);
        categoryRepository.save(category);
    }

    @Override
    public ResultPaginationResponse getAllCategories(Specification<Category> specification, Pageable pageable) {

        Page<Category> categoryPage = categoryRepository.findAll(specification, pageable);

        ResultPaginationResponse.Meta meta = ResultPaginationResponse.Meta.builder()
                .total(categoryPage.getTotalElements())
                .pages(categoryPage.getTotalPages())
                .page(pageable.getPageNumber() + 1)
                .pageSize(pageable.getPageSize())
                .build();
        List<CategoryResponse> categoryResponses = categoryPage.getContent()
                .stream().map(categoryMapping::fromCategoryToCategoryResponse).toList();

        return ResultPaginationResponse.builder()
                .meta(meta)
                .result(categoryResponses)
                .build();
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }
}
