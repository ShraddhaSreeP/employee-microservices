package com.example.service;

import com.example.dao.EmployeeRepository;
import com.example.dto.EmployeeRequest;
import com.example.dto.EmployeeResponse;
import com.example.event.EmployeeCreatedEvent;
import com.example.exception.EmployeeNotFoundException;
import com.example.integration.HrValidationClient;
import com.example.model.Employee;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Slf4j
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository repository;
    private final HrValidationClient hrValidationClient;
    private final StorageService storageService;
    private final ApplicationEventPublisher eventPublisher;

    public EmployeeServiceImpl(EmployeeRepository repository,
                               HrValidationClient hrValidationClient,
                               StorageService storageService,
                               ApplicationEventPublisher eventPublisher) {
        this.repository = repository;
        this.hrValidationClient = hrValidationClient;
        this.storageService = storageService;
        this.eventPublisher = eventPublisher;
    }

    @Override
    @CacheEvict(value = "employees", allEntries = true)
    public EmployeeResponse addEmployee(EmployeeRequest request, MultipartFile file) {
        log.info("Adding employee: {}", request.name());

        String result = hrValidationClient.validate(request.name());

        var isValid = switch (result) {
            case String s when s.contains("SUCCESS")  -> true;
            case String s when s.contains("FALLBACK") -> true;
            default -> false;
        };

        if (!isValid) {
            throw new RuntimeException("Employee validation failed for: " + request.name());
        }

        Employee employee = new Employee();
        employee.setName(request.name());

        if (file != null && !file.isEmpty()) {
            String fileUrl = storageService.upload(file);
            employee.setFilePath(fileUrl);
        }

        Employee saved = repository.save(employee);
        log.info("Employee saved with ID: {}", saved.getId());

        eventPublisher.publishEvent(EmployeeCreatedEvent.from(saved));

        return mapToResponse(saved);
    }

    @Override
    @Cacheable(value = "employees", key = "#id")
    public EmployeeResponse getEmployee(Long id) {
        Employee employee = repository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));
        return mapToResponse(employee);
    }

    @Override
    @Cacheable(value = "employees")
    public List<EmployeeResponse> getEmployees() {
        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @CacheEvict(value = "employees", allEntries = true)
    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {
        Employee employee = repository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));
        employee.setName(request.name());
        return mapToResponse(repository.save(employee));
    }

    @Override
    @CacheEvict(value = "employees", allEntries = true)
    public void deleteEmployee(Long id) {
        if (!repository.existsById(id)) {
            throw new EmployeeNotFoundException(id);
        }
        repository.deleteById(id);
    }

    private EmployeeResponse mapToResponse(Employee employee) {
        return new EmployeeResponse(
            employee.getId(),
            employee.getName(),
            employee.getFilePath(),
            employee.getCreatedAt(),
            employee.getStatus().name()
        );
    }
}
