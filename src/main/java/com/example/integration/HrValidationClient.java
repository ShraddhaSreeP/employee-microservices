package com.example.integration;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
    name = "hr-validation-service",
    fallback = HrValidationClient.HrValidationFallback.class
)
public interface HrValidationClient {

    @GetMapping("/api/v1/validate")
    String validate(@RequestParam("name") String name);

    @Component
    @Slf4j
    class HrValidationFallback implements HrValidationClient {
        @Override
        public String validate(String name) {
            log.warn("HR validation service unavailable, fallback for: {}", name);
            return "FALLBACK_" + name;
        }
    }
}
