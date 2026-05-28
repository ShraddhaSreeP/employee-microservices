package com.example.event;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class EmployeeEventListener {

    @Async
    @EventListener
    public void handleEmployeeCreated(EmployeeCreatedEvent event) {
        // Async notification — main thread block కాదు
        log.info("Sending welcome email to employee: {} (ID: {})", 
                event.employeeName(), event.employeeId());
        
        // Simulate email sending
        try {
            Thread.sleep(2000); // 2 seconds email send time
            log.info("Welcome email sent successfully to: {}", event.employeeName());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}