package com.bookstore.be.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoogleLoginRequest {
    private String accessToken; // Token Google trả về cho FE sau khi đăng nhập
}

