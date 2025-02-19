# Appstick - Agency Management System

A comprehensive agency management system built with Node.js, Express, TypeScript, and MongoDB.

## Features

### User Roles and Access Levels

The system supports multiple user roles with different access levels:

#### Agency Users
- **Admin**: Full system access and management capabilities
- **Manager**: Department-level management and oversight
- **Employee**: Basic access to department-specific features

#### Departments
- Design
- Development
- Marketing
- Sales

#### External Users
- **Customer**: Access to services and products

### Authentication

- Secure JWT-based authentication
- Role-based access control
- Password hashing using bcrypt

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- TypeScript

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd appstick
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Build the project
```bash
npm run build
```

### Database Seeding

The system comes with a seeding utility that creates test users for all roles.

To seed the database:
```bash
npm run seed
```

#### Default Users Created by Seed

##### Agency Users
- Admin: admin@agency.com / password123
- Marketing Manager: manager.marketing@agency.com / password123
- Development Manager: manager.dev@agency.com / password123
- Sales Employee: sales@agency.com / password123
- Designer: designer@agency.com / password123

##### Customer Users
- 5 sample customers are created with the email format:
  - customerN.firstname.lastname@customer.com
  - Example: customer1.john.smith@customer.com
- All customers use the password: password123

### Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Documentation

[Add API documentation here]

## License

[Add license information]