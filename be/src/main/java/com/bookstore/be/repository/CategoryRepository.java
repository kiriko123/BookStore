package com.bookstore.be.repository;

import com.bookstore.be.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long>, JpaSpecificationExecutor<Category> {
    boolean existsByName(String name);
    Category findByName(String name);

    @Query(value = "select categories.name, count(books.id) " +
            "from categories " +
            "join books on categories.id = books.category_id " +
            "group by categories.id", nativeQuery = true
    )
    List<Object[]> countBooksByCategory();
}
