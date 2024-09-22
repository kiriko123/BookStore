package com.bookstore.be.controller;

import com.bookstore.be.dto.request.book.BookCreateDTO;
import com.bookstore.be.dto.request.book.BookUpdateDTO;
import com.bookstore.be.dto.response.RestResponse;
import com.bookstore.be.model.Book;
import com.bookstore.be.service.BookService;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@Validated
@RequestMapping("/api/v1/book")
public class BookController {
    private final BookService bookService;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody BookCreateDTO bookCreateDTO){
        log.info("Create Book : {}", bookCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.addBook(bookCreateDTO));
    }

    @PutMapping
    public ResponseEntity<?> update(@Valid @RequestBody BookUpdateDTO bookUpdateDTO){
        log.info("Update Book : {}", bookUpdateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.updateBook(bookUpdateDTO));
    }

    @DeleteMapping("/{id}")
    public RestResponse<?> delete(@Min(1)@PathVariable Long id){
        log.info("Delete Book : {}", id);
        bookService.deleteBook(id);
        return RestResponse.builder()
                .statusCode(204)
                .message("Book deleted")
                .build();
    }
    @GetMapping
    public ResponseEntity<?> getAll(@Filter Specification<Book> specification, Pageable pageable){
        log.info("Get All Book : {}", specification);
        return ResponseEntity.status(HttpStatus.OK).body(bookService.getAllBooks(specification, pageable));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@Min(1) @PathVariable Long id){
        log.info("Get Book : {}", id);
        return ResponseEntity.status(HttpStatus.OK).body(bookService.getBookById(id));
    }
}
