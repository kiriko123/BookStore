package com.bookstore.be.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private ErrorResponse createErrorResponse(Exception e, WebRequest request, HttpStatus status, String error) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setPath(request.getDescription(false).replace("uri=", ""));
        errorResponse.setTimestamp(new Date());
        errorResponse.setStatus(status.value());
        errorResponse.setError(error);
        errorResponse.setMessage(e.getMessage());
        return errorResponse;
    }

    /*
        * MethodArgumentNotValidException
        Công dụng: Xử lý các trường hợp mà các tham số của phương thức không hợp lệ,
            thường xuất hiện khi các tham số không đáp ứng các ràng buộc validation.
        Ví dụ: Nếu một trường trong request body có giá trị null nhưng được đánh dấu là @NotNull, exception này sẽ được ném ra.

        * MissingServletRequestParameterException
        Công dụng: Xử lý các trường hợp thiếu các tham số yêu cầu trong request.
        Ví dụ: Nếu một request yêu cầu tham số id nhưng request không có tham số id, exception này sẽ được ném ra.

        *ConstraintViolationException
        Công dụng: Xử lý các trường hợp vi phạm ràng buộc dữ liệu,
             thường xuất hiện khi các tham số phương thức không đáp ứng các ràng buộc validation
             được định nghĩa bằng các annotation như @Size, @Min, @Max, etc.
        Ví dụ: Nếu một tham số có giá trị lớn hơn giá trị tối đa được phép, exception này sẽ được ném ra.
     */

    @ExceptionHandler({
            MethodArgumentNotValidException.class,
            MissingServletRequestParameterException.class,
            ConstraintViolationException.class
    })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidationExceptions(Exception e, WebRequest request) {
        String errorMessage;
        String errorType;

        if (e instanceof MethodArgumentNotValidException ex) {
            errorMessage = ex.getBindingResult().getFieldErrors().stream()
                    .map(error -> String.format("[%s: %s]", error.getField(), error.getDefaultMessage()))
                    .reduce("Validation failed: ", String::concat);
            errorType = "Invalid Payload";
        } else if (e instanceof ConstraintViolationException ex) {
            errorMessage = ex.getConstraintViolations().stream()
                    .map(violation -> String.format("[%s: %s]", violation.getPropertyPath(), violation.getMessage()))
                    .reduce("Constraint violations: ", String::concat);
            errorType = "Invalid Parameter";
        } else {
            errorMessage = e.getMessage();
            errorType = "Invalid Parameter";
        }

        ErrorResponse errorResponse = createErrorResponse(e, request, HttpStatus.BAD_REQUEST, errorType);
        errorResponse.setMessage(errorMessage);
        return errorResponse;
    }


    @ExceptionHandler({
            ResourceNotFoundException.class,
            UsernameNotFoundException.class
    })
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFoundException(Exception e, WebRequest request) {
        return createErrorResponse(e, request, HttpStatus.NOT_FOUND, "Resource Not Found");
    }

    @ExceptionHandler(StorageException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleStorageException(StorageException e, WebRequest request) {
        return createErrorResponse(e, request, HttpStatus.BAD_REQUEST, "Storage Error");
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleBadCredentialsException(BadCredentialsException e, WebRequest request) {
        return createErrorResponse(e, request, HttpStatus.UNAUTHORIZED, "Unauthorized");
    }

    @ExceptionHandler(InvalidDataException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleInvalidDataException(InvalidDataException e, WebRequest request) {
        return createErrorResponse(e, request, HttpStatus.CONFLICT, "Data Conflict");
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handleMethodNotSupportedException(HttpRequestMethodNotSupportedException e, WebRequest request) {
        return createErrorResponse(e, request, HttpStatus.METHOD_NOT_ALLOWED, "Method Not Allowed");
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    @ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
    public ErrorResponse handleMediaTypeNotSupportedException(HttpMediaTypeNotSupportedException e, WebRequest request) {
        return createErrorResponse(e, request, HttpStatus.UNSUPPORTED_MEDIA_TYPE, "Unsupported Media Type");
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorResponse handleAccessDeniedException(AccessDeniedException e, WebRequest request) {
        return createErrorResponse(e, request, HttpStatus.FORBIDDEN, "Access Denied");
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleDataIntegrityViolationException(DataIntegrityViolationException e, WebRequest request) {
        return createErrorResponse(e, request, HttpStatus.CONFLICT, "Data Integrity Violation");
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGeneralException(Exception e, WebRequest request) {
        return createErrorResponse(e, request, HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
}


