package com.example.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// Java 21 Record — immutable DTO, zero boilerplate!
public record EmployeeRequest(
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be 2-50 characters")
    String name
) {}