# User Management Application

**This is a full-stack User Management Application built using**:-

- **Backend:** Spring Boot (Java)
- **Frontend:** React.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)

## Features

- Add a new user
- List of users
- Search users by their userName, firstName, LastName, email.
- JWT-based authentication
- Layered architecture (Controller, Service, DTO, Repository, Response, config).

## Project Structure(Backend part)
Add_Search_User/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── org.addsearchuser/
│   │   │   ├── org.addsearchuser.config/
│   │   │   ├── org.addsearchuser.controller/
│   │   │   ├── org.addsearchuser.dto/
│   │   │   ├── org.addsearchuser.entity/
│   │   │   ├── org.addsearchuser.repository/
│   │   │   └── org.addsearchuser.service/
│   │   └── resources/
│   └── test/
│       └── java/
├── target/
├── HELP.md
├── mvnw
├── mvnw.cmd
└── pom.xml

## Project Structure(Frontend part)
addsearchuser-app/
├── public/
├── src/
│   ├── component/
│   │   ├── AddUser.jsx
│   │   ├── FormValidation.jsx
│   │   ├── Home.jsx
│   │   └── ListUser.jsx
│   ├── css/
│   │   ├── AddUser.css
│   │   ├── Home.css
│   │   ├── ListUser.css
│   │   └── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package-lock.json
└── package.json
