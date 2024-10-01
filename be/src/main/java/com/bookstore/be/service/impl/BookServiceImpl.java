package com.bookstore.be.service.impl;

import com.bookstore.be.dto.request.book.BookCreateDTO;
import com.bookstore.be.dto.request.book.BookUpdateDTO;
import com.bookstore.be.dto.response.ResultPaginationResponse;
import com.bookstore.be.dto.response.book.BookResponse;
import com.bookstore.be.exception.ResourceNotFoundException;
import com.bookstore.be.model.Book;
import com.bookstore.be.model.Category;
import com.bookstore.be.repository.BookRepository;
import com.bookstore.be.repository.CategoryRepository;
import com.bookstore.be.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Book getBookById(long id) {
        return bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book not found"));
    }

    @Override
    public BookResponse addBook(BookCreateDTO bookCreateDTO) {

        if(bookRepository.existsByName(bookCreateDTO.getName())) {
            throw new IllegalArgumentException("Book name already exists");
        }

        Category category = categoryRepository.findByName(bookCreateDTO.getCategoryName());
        if(category == null) {
            throw new IllegalArgumentException("Category not found");
        }

        Book book = Book.builder()
                .name(bookCreateDTO.getName())
                .author(bookCreateDTO.getAuthor())
                .price(bookCreateDTO.getPrice())
                .quantity(bookCreateDTO.getQuantity())
                .soldQuantity(bookCreateDTO.getSoldQuantity())
                .thumbnail(bookCreateDTO.getThumbnail())
                .category(category)
                .sliders(bookCreateDTO.getSliders())
                .active(true)
                .build();

        return BookResponse.from(bookRepository.save(book));
    }

    @Override
    public BookResponse updateBook(BookUpdateDTO bookUpdateDTO) {
        Book currentBook = getBookById(bookUpdateDTO.getId());

        Category category = categoryRepository.findByName(bookUpdateDTO.getCategoryName());
        if(category == null) {
            throw new IllegalArgumentException("Category not found");
        }

        currentBook.setName(bookUpdateDTO.getName());
        currentBook.setAuthor(bookUpdateDTO.getAuthor());
        currentBook.setPrice(bookUpdateDTO.getPrice());
        currentBook.setQuantity(bookUpdateDTO.getQuantity());
        currentBook.setSoldQuantity(bookUpdateDTO.getSoldQuantity());
        currentBook.setThumbnail(bookUpdateDTO.getThumbnail());
        currentBook.setCategory(category);
        currentBook.setSliders(bookUpdateDTO.getSliders());
        currentBook.setActive(bookUpdateDTO.isActive());

        return BookResponse.from(bookRepository.save(currentBook));
    }

    @Override
    public void deleteBook(long id) {
        Book currentBook = getBookById(id);
        currentBook.setActive(false);
        bookRepository.save(currentBook);
    }

    @Override
    public ResultPaginationResponse getAllBooks(Specification<Book> specification, Pageable pageable) {

        Page<Book> books = bookRepository.findAll(specification, pageable);

        ResultPaginationResponse.Meta meta = ResultPaginationResponse.Meta.builder()
                .total(books.getTotalElements())
                .pages(books.getTotalPages())
                .page(pageable.getPageNumber() + 1)
                .pageSize(pageable.getPageSize())
                .build();

        List<BookResponse> bookResponses = books.getContent().stream().map(BookResponse::from).toList();

        return ResultPaginationResponse.builder()
                .meta(meta)
                .result(bookResponses)
                .build();
    }
}
