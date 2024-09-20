package com.bookstore.be.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Builder
public class FileResponse {
    private String fileName;
    private Instant uploadedAt;
}
