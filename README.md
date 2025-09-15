# Library Management (Spring Boot) - Minimal Scaffold

This is a Spring Boot and ReactJS project with:
- MySQL (configure credentials in `application.properties`)
- JWT authentication (register/login)
- Basic Book and Loan controllers
- Swagger UI (springdoc) available at `/swagger-ui.html` after starting
- Frontend built with React and styled using Material-UI (MUI) for a modern, responsive UI.

How to run backend:
1. Edit `src/main/resources/application.properties` and set `spring.datasource.username` and `spring.datasource.password` and `app.jwt.secret`.
2. Start MySQL and create database `library_db`.
3. Run with `./mvnw spring-boot:run` (or build jar and run).

How to run frontend:
1. cd library-management-frontend-reactjs.
2. npm install.
3. npm run dev.


