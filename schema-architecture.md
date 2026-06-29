# Architecture Summary

The Smart Clinic Management System is built using Spring Boot and follows a three-tier architecture. The presentation layer includes both Thymeleaf pages for administrators and doctors and REST APIs for patients and appointment management. This design allows the application to support both traditional web pages and API-based clients.

The application uses a common service layer to process business logic. Controllers forward requests to the service layer, which communicates with repositories for database operations. MySQL stores structured business data such as patients, doctors, appointments, and administrators, while MongoDB stores prescription documents. Spring Data JPA is used for MySQL, and Spring Data MongoDB is used for MongoDB.


# Numbered Flow of Data and Control

1. Users access the application through Thymeleaf web pages or REST API clients.
2. Requests are received by either MVC controllers or REST controllers.
3. Controllers forward the requests to the service layer.
4. The service layer applies business rules and calls the appropriate repositories.
5. Repository classes communicate with either MySQL or MongoDB.
6. Retrieved database records are mapped into Java entity or document models.
7. The controller returns HTML pages for MVC requests or JSON responses for REST API requests.