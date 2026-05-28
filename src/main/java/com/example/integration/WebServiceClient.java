package com.example.integration;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@Slf4j
public class WebServiceClient {

    private final WebClient webClient = WebClient.create();

    @Value("${app.webservice-url}")
    private String webServiceUrl;

    @CircuitBreaker(name = "employeeValidation", fallbackMethod = "fallback")
    public String validate(String name) {
        return webClient.get()
                .uri(webServiceUrl + "?name=" + name)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String fallback(String name, Exception e) {
        log.warn("HR service unavailable, using fallback for: {}", name);
        return "FALLBACK_" + name;
    }
}
