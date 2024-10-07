package com.bookstore.be.util;

import com.bookstore.be.util.annotation.PhoneNumber;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;
/*
    Đầu số quốc tế và nội hạt:
        Cho phép:
        Bắt đầu bằng +84 hoặc 84 (mã quốc gia Việt Nam).
        Bắt đầu bằng 0.
        Kết hợp: Có thể bắt đầu bằng +84, 84, hoặc 0.
    Đầu số nhà mạng:
        Cho phép: Ba số tiếp theo phải là một trong các đầu số của các nhà mạng Việt Nam: 3, 5, 7, 8, 9.
        Các chữ số còn lại:
        Chữ số cuối: Phải có 8 chữ số từ 0 đến 9.
    Kết thúc số điện thoại:
        \b: Đảm bảo số điện thoại kết thúc tại đó, không phải là phần của chuỗi số dài hơn.
 */
public class PhoneNumberValidator implements ConstraintValidator<PhoneNumber, String> {

    private static final Pattern VALID_PHONE_NUMBER_REGEX =
            Pattern.compile("((\\+|)84|0)(3|5|7|8|9)+([0-9]{8})\\b");

    @Override
    public boolean isValid(String phoneNumberField, ConstraintValidatorContext context) {
        if (phoneNumberField == null) {
            return true; // Cho phép null, có thể thay đổi tùy yêu cầu
        }
        return VALID_PHONE_NUMBER_REGEX.matcher(phoneNumberField).matches();
    }
}
