package com.bookstore.be.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL) //null -> bỏ
public class ErrorResponse {
    private Date timestamp;
    private String message;
    private int status;
    private String error;
    private String path;
}
