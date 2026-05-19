# Todo Application

A modern, full-stack Todo application built with Spring Boot and vanilla JavaScript.

## Project Structure

```
hello/
├── src/
│   ├── main/
│   │   ├── java/org/pragna/todos/
│   │   │   ├── TodosApplication.java          # Spring Boot main application
│   │   │   ├── model/
│   │   │   │   └── Todo.java                  # Todo entity model
│   │   │   ├── service/
│   │   │   │   └── TodoService.java           # Business logic service
│   │   │   └── controller/
│   │   │       └── TodoController.java        # REST API endpoints
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── index.html                 # Frontend HTML
│   │       │   ├── style.css                  # Styling
│   │       │   └── app.js                     # Frontend JavaScript
│   │       └── application.properties         # Spring Boot configuration
│   └── test/
└── pom.xml                                    # Maven configuration

## Features

- ✅ Create, Read, Update, Delete (CRUD) todos
- ✅ Mark todos as complete/incomplete
- ✅ In-memory persistence
- ✅ RESTful API endpoints
- ✅ Responsive web interface
- ✅ Modern UI with gradient design

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/{id}` | Get todo by ID |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/{id}` | Update todo |
| DELETE | `/api/todos/{id}` | Delete todo |
| DELETE | `/api/todos` | Clear all todos |

## Running the Application

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Build
```bash
mvn clean install
```

### Run
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### Package
```bash
mvn clean package
java -jar target/todos-1.0.0.jar
```

## Technology Stack

- **Backend**: Spring Boot 3.1.5
- **Language**: Java 17
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: RESTful API with JSON

## Data Model

### Todo
```json
{
  "id": 1,
  "title": "Learn Java",
  "description": "Study Java basics and OOP",
  "completed": false
}
```

## Example API Usage

### Get all todos
```bash
curl http://localhost:8080/api/todos
```

### Create a todo
```bash
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","description":"Milk, eggs, bread","completed":false}'
```

### Update a todo
```bash
curl -X PUT http://localhost:8080/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","description":"Milk, eggs, bread","completed":true}'
```

### Delete a todo
```bash
curl -X DELETE http://localhost:8080/api/todos/1
```

## Notes

- Todos are stored in memory and will be lost when the application restarts
- For production use, integrate a database (H2, PostgreSQL, MySQL, etc.)
- The application includes sample data on startup
