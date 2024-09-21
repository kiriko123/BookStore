package com.bookstore.be.service;

import com.bookstore.be.dto.request.book.BookCreateDTO;
import com.bookstore.be.dto.request.book.BookUpdateDTO;
import com.bookstore.be.dto.response.ResultPaginationResponse;
import com.bookstore.be.dto.response.book.BookResponse;
import com.bookstore.be.model.Book;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface BookService {
    Book getBookById(long id);
    BookResponse addBook(BookCreateDTO bookCreateDTO);
    BookResponse updateBook(BookUpdateDTO bookUpdateDTO);
    void deleteBook(long id);

    ResultPaginationResponse getAllBooks(Specification<Book> specification, Pageable pageable);

}
