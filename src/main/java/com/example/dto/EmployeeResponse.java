package com.example.dto;

import java.time.LocalDateTime;

// Java 21 Record — response DTO
public record EmployeeResponse(
    Long id,
    String name,
    String fileUrl,
    LocalDateTime createdAt,
    String status
) {}