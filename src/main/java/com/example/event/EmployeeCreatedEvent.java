package com.example.event;

import com.example.model.Employee;

// Java 21 Record — event object
public record EmployeeCreatedEvent(
    Long employeeId,
    String employeeName,
    String fileUrl
) {
    public static EmployeeCreatedEvent from(Employee employee) {
        return new EmployeeCreatedEvent(
            employee.getId(),
            employee.getName(),
            employee.getFilePath()
        );
    }
}