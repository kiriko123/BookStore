package com.bookstore.be.service;

import com.bookstore.be.dto.request.user.ChangePasswordDTO;
import com.bookstore.be.dto.request.user.RegisterRequestDTO;
import com.bookstore.be.dto.request.user.UserUpdateInfoDTO;
import com.bookstore.be.dto.response.user.UserResponse;
import com.bookstore.be.model.User;

public interface AccountService {
    UserResponse register(RegisterRequestDTO registerRequestDTO);
    UserResponse googleRegister(RegisterRequestDTO registerRequestDTO);
    void verifyUser(String verificationCode);
    void resendVerificationCode(String email);
    void sendVerificationEmail(User user);
    void forgotPassword(String email);
    void resetPassword(String verificationCode, String newPassword);
    void changePassword(ChangePasswordDTO changePasswordDTO);
    void updateUserInfo(UserUpdateInfoDTO userUpdateInfoDTO);
}
