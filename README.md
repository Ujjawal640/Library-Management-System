# Library Management (Spring Boot) - Minimal Scaffold

This is a minimal Spring Boot project scaffold with:
- MySQL (configure credentials in `application.properties`)
- JWT authentication (register/login)
- Basic Book and Loan controllers
- Swagger UI (springdoc) available at `/swagger-ui.html` after starting

How to run:
1. Edit `src/main/resources/application.properties` and set `spring.datasource.username` and `spring.datasource.password` and `app.jwt.secret`.
2. Start MySQL and create database `library_db`.
3. Run with `./mvnw spring-boot:run` (or build jar and run).

Notes:
- This is a starting point. Business logic (availability checks, fines calculation, roles restrictions) should be extended.
