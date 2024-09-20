package com.bookstore.be.service;

import org.springframework.core.io.InputStreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;

public interface FileService {
    void createDirectory(String folder) throws URISyntaxException;
    String storeFile(MultipartFile multipartFile, String folder) throws URISyntaxException, IOException;
    InputStreamResource getResource(String fileName, String folder)
            throws URISyntaxException, FileNotFoundException;
    long getFileLength(String fileName, String folder) throws URISyntaxException;
}
