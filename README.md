# Todo Backend

**A RESTful API for managing todos, built with Node.js, Express, and MongoDB.**

## Features

- Create, read, update, and delete todos (CRUD operations)
- Clear and concise API endpoints
- Error handling and informative error messages
- Basic data validation

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/renjithroy/todo-backend.git
   ```

2. Install dependencies:

   ```bash
   cd todo-backend
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. The server will start running on port 3000.

## API Endpoints

**Base URL:** `http://localhost:3000/todos`

| Method | Endpoint | Description                  |
|--------|----------|------------------------------|
| GET    | `/`      | Retrieve all todos           |
| GET    | `/:id`   | Retrieve a todo by ID        |
| POST   | `/`      | Create a new todo            |
| PATCH  | `/:id`   | Update a todo by ID          |
| DELETE | `/:id`   | Delete a todo by ID          |

## Data Structure

```json
{
  "todoId": 1,
  "todoDesc": "Learn pointers in C++",
  "isDone": false
}
```

Happy Organizing!