package com.bookstore.be.service.impl;

import com.bookstore.be.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


@Service
public class FileServiceImpl implements FileService {

    @Value("${khang.upload-file.base-uri}")
    private String baseUri;

    @Override
    public void createDirectory(String folder) throws URISyntaxException {
        URI uri = new URI(folder);
        Path path = Paths.get(uri);
        File tmpDir = new File(path.toString());
        if (!tmpDir.isDirectory()) {
            try {
                Files.createDirectory(tmpDir.toPath());
                System.out.println(">>> CREATE NEW DIRECTORY SUCCESSFUL, PATH = " + folder);
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        } else {
            System.out.println(">>> SKIP MAKING DIRECTORY, ALREADY EXISTS");
        }
    }

    @Override
    public String storeFile(MultipartFile multipartFile, String folder) throws URISyntaxException, IOException {
        // create unique filename
        String finalName = System.currentTimeMillis() + "-" + multipartFile.getOriginalFilename();
        URI uri = new URI(baseUri + folder + "/" + finalName);
        Path path = Paths.get(uri);
        try (InputStream inputStream = multipartFile.getInputStream()) {
            Files.copy(inputStream, path,
                    StandardCopyOption.REPLACE_EXISTING);
        }
        return finalName;
    }

    @Override
    public InputStreamResource getResource(String fileName, String folder) throws URISyntaxException, FileNotFoundException {
        URI uri = new URI(baseUri + folder + "/" + fileName);
        Path path = Paths.get(uri);

        File file = new File(path.toString());
        return new InputStreamResource(new FileInputStream(file));
    }

    @Override
    public long getFileLength(String fileName, String folder) throws URISyntaxException {
        URI uri = new URI(baseUri + folder + "/" + fileName);
        Path path = Paths.get(uri);

        File tmpDir = new File(path.toString());

        // file không tồn tại, hoặc file là 1 director => return 0
        if (!tmpDir.exists() || tmpDir.isDirectory())
            return 0;
        return tmpDir.length();
    }
}
