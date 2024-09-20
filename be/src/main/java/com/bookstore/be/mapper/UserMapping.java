package com.bookstore.be.mapper;

import com.bookstore.be.dto.request.user.UserRegisterRequestDTO;
import com.bookstore.be.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapping {
    User toUser(UserRegisterRequestDTO userRegisterRequestDTO);
}
