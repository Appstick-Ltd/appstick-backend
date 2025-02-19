# Appstick Backend

A robust and scalable Express.js application built with TypeScript and MongoDB, following industry best practices for modern web API development.

## Features

- **TypeScript Integration** - Full TypeScript support with strict type checking
- **MongoDB & Mongoose** - Robust database integration with Mongoose ODM
- **Modular Architecture** - Well-organized, maintainable code structure
- **User Management** - Complete CRUD operations with pagination and search
- **File Upload** - Secure file upload functionality
- **Authentication** - Secure user authentication system
- **Error Handling** - Centralized error handling middleware
- **Logging** - Comprehensive logging with Winston
- **Code Quality** - ESLint and Prettier configuration
- **Environment Management** - Secure environment variable handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- TypeScript knowledge
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd appstick-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/express-ts-app

   # JWT Configuration
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=24h

   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=5242880 # 5MB
   ```

## Development

1. Start development server:
   ```bash
   npm run dev
   ```

2. Run type checking in watch mode:
   ```bash
   npm run type-check:watch
   ```

## Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Start production server:
   ```bash
   npm start
   ```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token

### Users
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users (with pagination and search)
  - Query params:
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)
    - `name`: Filter by name
    - `email`: Filter by email
    - `role`: Filter by role
    - `department`: Filter by department
    - `active`: Filter by active status
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `POST /api/products` - Create a new product
- `GET /api/products` - Get all products (with pagination and search)
  - Query params:
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)
    - `name`: Filter by name
    - `techStack`: Filter by tech stack
    - `price`: Filter by price
    - `sales`: Filter by sales count
    - `reviews`: Filter by review count
    - `likes`: Filter by likes count
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Services
- `POST /api/services` - Create a new service
- `GET /api/services` - Get all services (with pagination and search)
  - Query params:
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)
    - `title`: Filter by title
    - `category`: Filter by category
    - `status`: Filter by status
    - `price`: Filter by price
    - `rating`: Filter by rating
    - `reviewCount`: Filter by review count
- `GET /api/services/:id` - Get service by ID
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### File Upload
- `POST /api/upload` - Upload file(s)
- `GET /api/upload/:filename` - Get uploaded file

## Project Structure

```
src/
├── config/           # Configuration files
├── modules/          # Feature modules
│   ├── auth/         # Authentication module
│   ├── users/        # User module
│   ├── products/     # Product management module
│   ├── services/     # Service management module
│   └── upload/       # File upload module
├── middlewares/      # Custom middleware
│   ├── auth/         # Authentication middleware
│   ├── error/        # Error handling
│   └── logger/       # Request logging
├── utils/            # Utility functions
├── app.ts           # Express app setup
└── server.ts        # Application entry point
```

## Error Handling

The API uses a centralized error handling mechanism with custom error classes:
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.