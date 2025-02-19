# Express TypeScript MongoDB API

A modular Express.js application built with TypeScript and MongoDB, following best practices for scalability and maintainability.

## Features

- TypeScript support
- MongoDB integration with Mongoose
- Modular architecture
- CRUD operations for users
- Error handling middleware
- Logging with Winston
- ESLint and Prettier configuration
- Environment variable support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally
- TypeScript knowledge

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/express-ts-app
   NODE_ENV=development
   ```

## Development

Start the development server:
```bash
npm run dev
```

## Build and Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### Users
- POST /api/users - Create a new user
- GET /api/users - Get all users
- GET /api/users/:id - Get a user by ID
- PUT /api/users/:id - Update a user
- DELETE /api/users/:id - Delete a user

## Project Structure

```
src/
├── config/           # Configuration files
├── modules/          # Feature modules
│   └── users/        # User module
├── middlewares/      # Custom middleware
├── utils/            # Utility functions
├── app.ts           # Express app setup
└── server.ts        # Application entry point
```

## License

ISC 