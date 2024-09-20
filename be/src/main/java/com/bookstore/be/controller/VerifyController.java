package com.bookstore.be.controller;

import com.bookstore.be.service.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/auth")
public class VerifyController {

    private final AccountService signupService;

    @GetMapping("/verify")
    public String verifyUser(@RequestParam("code") String code, Model model) {
        try {
            signupService.verifyUser(code);
            return "verify_email";
        } catch (RuntimeException e) {
            model.addAttribute("error", e.getMessage());
            return "error";
        }
    }
}
