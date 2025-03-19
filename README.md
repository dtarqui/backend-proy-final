# Backend - Task Management System

This is the backend for a task management system built with Node.js, Express, and Sequelize. It provides a RESTful API for managing users and tasks, including authentication and authorization.

## Features

- **User Management**: Register, login, and fetch user details.
- **Task Management**: Create, read, update, and delete tasks with filtering and pagination support.
- **Authentication**: Secure authentication using JWT.
- **Database Integration**: Uses PostgreSQL with Sequelize ORM.
- **Middleware**: Includes middleware for authentication and error handling.
- **Seeding**: Preloaded demo users and tasks for testing.

## Project Structure

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and specify the following:

   ```
   DB_HOST=your-database-host
   DB_PORT=your-database-port
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   JWT_SECRET=your-jwt-secret
   ```

4. **Set Up the Database**:

   - Update the database configuration in `config/config.json` with your PostgreSQL credentials.
   - Run migrations to create the database schema:
     ```bash
     npx sequelize-cli db:migrate
     ```
   - Seed the database with demo data:
     ```bash
     npx sequelize-cli db:seed:all
     ```

5. **Start the Server**:
   ```bash
   npm start
   ```
   The server will run at [http://localhost:3001](http://localhost:3001).

## API Endpoints

### Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login and receive a JWT.
- **GET** `/api/auth/me`: Get the authenticated user's details.

### Tasks

- **GET** `/api/tasks`: Fetch tasks for the authenticated user.
- **POST** `/api/tasks`: Create a new task.
- **GET** `/api/tasks/:id`: Fetch a specific task by ID.
- **PUT** `/api/tasks/:id`: Update a task by ID.
- **DELETE** `/api/tasks/:id`: Delete a task by ID.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express**: Web framework.
- **Sequelize**: ORM for PostgreSQL.
- **PostgreSQL**: Relational database.
- **JWT**: Authentication.
- **bcrypt.js**: Password hashing.

## License

This project is licensed under the MIT License.
