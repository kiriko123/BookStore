package com.bookstore.be.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/admin/hello")
    public String hello() {
        return "hello admin";
    }

    @GetMapping("/user/hello")
    public String hello1() {
        return "hello user + admin";
    }
}
