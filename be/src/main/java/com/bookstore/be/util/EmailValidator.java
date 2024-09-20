package com.bookstore.be.util;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class EmailValidator {

    // Biểu thức chính quy để kiểm tra định dạng email
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

    // Biểu thức chính quy được biên dịch
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    /**
     * Kiểm tra xem địa chỉ email có hợp lệ không.
     *
     * @param email Địa chỉ email cần kiểm tra.
     * @return true nếu địa chỉ email hợp lệ, false nếu không.
     */
    public static boolean isValidEmail(String email) {
        if (email == null) {
            return false;
        }
        Matcher matcher = EMAIL_PATTERN.matcher(email);
        return matcher.matches();
    }

}

