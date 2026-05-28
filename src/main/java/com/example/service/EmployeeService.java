package com.example.service;

import com.example.dto.EmployeeRequest;
import com.example.dto.EmployeeResponse;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface EmployeeService {
    EmployeeResponse addEmployee(EmployeeRequest request, MultipartFile file);
    EmployeeResponse updateEmployee(Long id, EmployeeRequest request);
    EmployeeResponse getEmployee(Long id);
    List<EmployeeResponse> getEmployees();
    void deleteEmployee(Long id);
}