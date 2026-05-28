package com.example.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@Profile("dev")
@Slf4j
public class MockStorageService implements StorageService {

    @Override
    public String upload(MultipartFile file) {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String url = "https://mock-s3-bucket.s3.amazonaws.com/" + fileName;
        log.info("Mock upload: {} -> {}", file.getOriginalFilename(), url);
        return url;
    }
}
