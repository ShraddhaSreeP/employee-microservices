# Employee Management System — Spring Boot Migration

## What is this project?

This project is a migration of a legacy Jakarta EE Servlet-based Employee Management System to modern Spring Boot 3 with Java 21.

The goal was not just to make it work, but to fix every problem in the legacy code using the right modern solution.

---

## What was wrong in the legacy code?

| Problem | Legacy Code | Impact |
|---|---|---|
| No dependency injection | `new EmployeeServiceImpl()` | Tightly coupled, untestable |
| No real database | `System.out.println("Saved")` | Data never persisted |
| Fake HTTP call | Always returned `SUCCESS_name` | Validation was meaningless |
| Hardcoded file path | `/opt/uploads/` | Crashed on Windows/Mac |
| Empty catch blocks | `catch(Exception e) {}` | Errors disappeared silently |
| Plain text responses | `"POST OK"` | No HTTP standards |
| No input validation | `req.getParameter("name")` | Invalid data saved to DB |

---

## What was fixed?

| Legacy | Modern | Why |
|---|---|---|
| `HttpServlet` | `@RestController` | HTTP standards, proper status codes |
| `new EmployeeServiceImpl()` | Constructor injection | Loosely coupled, testable |
| `System.out.println` | Spring Data JPA | Real database persistence |
| Fake HTTP mock | WebClient + Circuit Breaker | Real HTTP calls with resilience |
| `/opt/uploads/` | Profile-based StorageService | Cloud-ready, OS independent |
| Empty catch | GlobalExceptionHandler | Proper error responses |
| `"POST OK"` | `ResponseEntity` | HTTP status codes + JSON |
| No validation | `@Valid` + Records | Input validation with messages |

---

## How to Run

### Prerequisites
- Java 21
- Maven
- MySQL 8.0

### Setup Database
```sql
CREATE DATABASE empdb;
```

### Run (Dev Profile)
```bash
mvn spring-boot:run
```

### Run (Prod Profile)
```bash
mvn spring-boot:run -Dspring.profiles.active=prod
```

---

## API Endpoints

| Method | URL | Description |
|---|---|---|
| GET | `/api/v1/employees` | Get all employees |
| GET | `/api/v1/employees/{id}` | Get employee by ID |
| POST | `/api/v1/employees` | Create new employee |
| PUT | `/api/v1/employees/{id}` | Update employee |
| DELETE | `/api/v1/employees/{id}` | Delete employee |

### Swagger UI
```
http://localhost:8080/swagger-ui/index.html
```

### Health Check
```
http://localhost:8080/actuator/health
```

---

## Project Structure

```
src/main/java/com/example/
├── controller/
│   └── EmployeeController.java      — REST endpoints
├── service/
│   ├── EmployeeService.java         — Interface
│   ├── EmployeeServiceImpl.java     — Business logic
│   ├── StorageService.java          — File storage interface
│   ├── MockStorageService.java      — Dev: fake S3
│   └── S3Service.java               — Prod: real AWS S3
├── dao/
│   └── EmployeeRepository.java      — JPA repository
├── model/
│   └── Employee.java                — DB entity
├── dto/
│   ├── EmployeeRequest.java         — Input DTO (Java 21 Record)
│   └── EmployeeResponse.java        — Output DTO (Java 21 Record)
├── integration/
│   └── WebServiceClient.java        — External HR service call
├── event/
│   ├── EmployeeCreatedEvent.java    — Event record
│   └── EmployeeEventListener.java   — Async listener
├── exception/
│   ├── EmployeeNotFoundException.java
│   └── GlobalExceptionHandler.java  — Centralized error handling
└── config/
    ├── AsyncConfig.java             — @EnableAsync
    └── CacheConfig.java             — @EnableCaching
```

---

## Key Technical Decisions

### 1. Constructor Injection over Field Injection
Dependencies are injected through constructor, making the code testable and loosely coupled.

### 2. WebClient over RestTemplate
RestTemplate is deprecated in Spring 6. WebClient supports async operations and integrates easily with Circuit Breaker.

### 3. Circuit Breaker for External Service
If the HR validation service goes down, the circuit opens after 3 failures and the fallback runs. The app stays up.

### 4. Profile-based Storage
`MockStorageService` runs in dev — no AWS needed. `S3Service` runs in prod. Switch with one config change.

### 5. Java 21 Records for DTOs
Records are immutable data classes. What used to be 50 lines is now 1 line with auto-generated constructor, getters, equals, hashCode, toString.

### 6. Async Events for Notifications
After saving an employee, an event is published instantly. The email notification happens in a background thread. The API response is not blocked.

---

## Running Tests

```bash
mvn test
```

---

## Tech Stack

- Java 21
- Spring Boot 3.2
- Spring Data JPA
- Spring Security (optional)
- Resilience4j Circuit Breaker
- WebClient (Spring WebFlux)
- MySQL 8.0
- Lombok
- Maven
