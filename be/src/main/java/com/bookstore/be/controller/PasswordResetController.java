package com.bookstore.be.controller;

import com.bookstore.be.model.User;
import com.bookstore.be.repository.UserRepository;
import com.bookstore.be.service.AccountService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/api/v1/auth")
public class PasswordResetController {
    private final AccountService signupService;
    private final UserRepository userRepository;

    public PasswordResetController(AccountService signupService, UserRepository userRepository) {
        this.signupService = signupService;
        this.userRepository = userRepository;
    }

    @GetMapping("/reset-password")
    public String showResetPasswordForm(@RequestParam("code") String code, Model model) {
        System.out.println(code);

        User user =  userRepository.findByVerificationCode(code);

        if(user == null) {
            model.addAttribute("error", "Invalid verification code");
            return "error";
        }

        model.addAttribute("code", code);
        return "reset_password"; // This will render the password reset form
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam("code") String code,
                                @RequestParam("password") String password,
                                @RequestParam("confirmPassword") String confirmPassword,
                                Model model) {
        if (!password.equals(confirmPassword)) {
            // Sử dụng redirect để giữ nguyên code trên URL
            return "redirect:/api/v1/auth/reset-password?code=" + code + "&error=Passwords do not match";
        }

        try {
            signupService.resetPassword(code, password);
            return "changepassword_success";
        } catch (RuntimeException e) {
            // Truyền lỗi thông qua query string và giữ lại code
            return "redirect:/api/v1/auth/reset-password?code=" + code + "&error=" + e.getMessage();
        }
    }


}
