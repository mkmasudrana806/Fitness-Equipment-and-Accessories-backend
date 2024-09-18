# Fitness-Equipment-and-Accessories

## Important Links

1. **Live Deployment Link :**

- [Live Server](https://fitness-equipment-and-accessories-client-two.vercel.app)

2. **GitHub Repository Link :**

- [GitHub Repository](https://github.com/mkmasudrana806/Fitness-Equipment-and-Accessories-backend.git)

## Overview

`Fitness Equipment And Accessories` is an Ecommerce backend application designed to manage various entities and processes related to an Ecommerce application. it uses well-structured REST API with CRUD operation and so on. The project provides comprehensive functionality for managing different user types like public, user, and admin. also authorization, services, and operations within the system.

The main focus of this project is to implement modules pattern, QueryBuilder, vast Error Handling, CRUD operations, Authentication & Authorization, Transaction & Rollback, email sending using nodemailer and static files upload to server and image upload to cloudinary.

## Features

- **User Management:** Register, login, buy products, payment, transaction history and role-based access control.

- **Authentication:** Secure user authentication using JWT for login, registration, and token management.

- **Products, Orders, Reviews, Comments, FAQ, Orders, and Payments Management**
  admin can manage all of these modules

## API’s Endpoints

### Auth:

- **POST** `/auth/login` - Log in a user.
- **POST** `/auth/change-password` - Change a user's password.
- **POST** `/auth/change-password` - Change a user's password.
- **POST** `/auth/forgot-password` - forgot user's password.
- **POST** `/auth/reset-password` - reset user's password.

### User:

- **POST** `/users/create-user` - create an user.
- **GET** `/users` - Retrieve all users.
- **GET** `/users/:id` - Retrieve an user by ID.
- **GET** `/users/getMe` - get my profile
- **DELETE** `/users/:id` - Delete an user by ID.
- **PUT** `/users/:id` - Update an user by ID.
- **PUT** `/users/change-status/id` - change user status like `active` or `block user`

### Product:

- **POST** `/products/create-product` - Create a new product.
- **GET** `/products` - Retrieve all products.
- **GET** `/products/:id` - Retrieve a product.
- **DELETE** `/products/:id` - Delete a product.
- **PATCH** `/products/:id` - Update a product.
- **POST** `/services/slots` - Create time slots for a service.

### Order:

- **POST** `/orders/create-order` - make an order.
- **POST** `/orders/change-order-status/:id` - change order status.
- **GET** `/orders` - retrieve all orders
- **GET** `/orders/my-orders` - get user orders

### Payment:

- **POST** `/payments/my-payments-history` - my payment history.
- **GET** `/payments` - Retrieve all payments.

## Installation

### Pre Requisites

- Must have Nodejs and Typescript installed on your machine.
- replace `origin: "https://fitness-equipment-and-accessories-client-two.vercel.app",` with your client side link as origin in app.ts file

To get the project up and running locally, follow these steps:

`Note:` before running the application, please include .env file root of your project. below is given instructions of it.

1. **Clone the repository:**

```bash
git clone https://github.com/mkmasudrana806/Fitness-Equipment-and-Accessories-backend.git
cd fitness-equipment-and-accessories-backend
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Build the project:**

```bash
tsc
```

4. **Start the development server:**

```bash
npm start
```

## Environment Variables

Create a .env file in the root of the project and add your variables:

```bash
# this is not main `.evn` file. it just example file
# must include .env file at root directory of your project.

# app port
PORT=5000

# your local or remote database url
DATABASE_URL=mongodb://localhost:27017/gymbolt

# user default password
DEFAULT_PASSWORD=user1234

#becrypt salt rounds
BCRYPT_SALT_ROUNDS=10

# node environment
NODE_ENVIRONMENT=development #make production before deployment

# jwt token
JWT_ACCESS_SECRET=4c5a63808e3c8897500c8dcaaba1abc79c783e4de4f44962ae6b5ec3eb50d1e7b04b850f334143eb11b2b9b1b464d76bd77ba7cd501e76365c0b7a989ca87a15
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_SECRET=23f43ef957f8c489b9e589f75c7204608c9d85230ff7608598bd3c51f46a303b5c644aecb5bd5a6104d96c015ca838399ff47a208390a994ee8a4e5a515897c9
JWT_REFRESH_EXPIRES_IN=365D

# nodemailer user and password
NODE_MAILER_USER= #your email address
NODE_MAILER_PASSWORD= #your api key password (collect from gmail security->two factor authentication and create a app key)

# reset password ui link
RESET_PASSWORD_UI_LINK=http://localhost:5173 #your reset password frontend ui link

#cloudinary
CLOUDINARY_NAME= #your cloudinary name
CLOUDINARY_API_KEY= #your cloudinary api key
CLOUDINARY_SECRET_KEY= #your cloudinary secret key
```

## Usage

### User Routes

- **POST** `/users/create-user` - register a new user

**Request Body:**

```json
{
  {
    "name": {
      "firstName": "Masud",
      "middleName": "",
      "lastName": "Rana"
    },
    "email": "masud1@gmail.com", "password": "masud1",
    "age": 20,
    "contact": "017234324324",
    "address": "Sirajganj" , "gender":"male"
  }
}
```

**Response**:

```json
{
 {
  "success": true,
  "message": "User created successfully",
  "data": {
    "name": {
      "firstName": "Masud",
      "middleName": "",
      "lastName": "Rana",
      "_id": "66eae2a539d2a64ef965cd65"
    },
    "email": "masud1@gmail.com",
    "password": "",
    "age": 20,
    "gender": "male",
    "contact": "017234324324",
    "address": "Sirajganj",
    "role": "user",
    "status": "active",
    "profileImg": "https://avatar.iran.liara.run/public/boy?username=Ash",
    "isDeleted": false,
    "_id": "66eae2a539d2a64ef965cd64",
    "createdAt": "2024-09-18T14:24:37.634Z",
    "updatedAt": "2024-09-18T14:24:37.634Z",
    "__v": 0
  }
}
}
```

###

- **POST** `/auth/login` - Log in a user.

**Request Body:**

```json
{
  "email": "web@programming-hero.com",
  "password": "ph-password"
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDYyOWI4ZThjZmNkOTI2Mzg0YjZlNWUiLCJuYW1lIjoiUHJvZ3JhbW1pbmcgSGVyb3MiLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5MCIsInJvbGUiOiJhZG1pbiIsImFkZHJlc3MiOiIxMjMgTWFpbiBTdHJlZXQsIENpdHksIENvdW50cnkiLCJpYXQiOjE2MjQ1MTY2MTksImV4cCI6MTYyNDUyMDYxOX0.kWrEphO6lE9P5tvzrNBwx0sNogNuXpdyG-YoN9fB1W8",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "phone": "1234567890",
    "role": "admin",
    "address": "123 Main Street, City, Country",
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
```

### product Routes

- **POST** `/products/create-product` - Create a new service.

**Request Headers:**

```javascript
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF;
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c;
```

**Request Body:**

```json
{
  "name": "Flat Weight Bench",
  "price": 149.99,
  "category": "Benches",
  "quantity": 25,
  "featured": true,
  "description": "Flat weight bench perfect for dumbbell and barbell exercises.",
  "productImgUrl": "https://m.media-amazon.com/images/I/81ek8iCurdL._AC_UF894,1000_QL80_.jpg"
}
```

### Order Routes:

- **GET** `/orders/create-order` - make an order

**Request Headers:**

```json
{
  "email": "masud@gmail.com",
  "shippingAddress": {
    "name": "John Doe",
    "email": "jassika@example.com",
    "contact": "123-456-7890",
    "address": "123 Main Street, Anytown, USA"
  },
  "items": [
    {
      "productId": "66e426f407e67bd384aa3285",
      "quantity": 2,
      "price": 49.99
    }
  ],
  "paymentMethod": "cod"
}
```

### Review:

- **POST** `/reviews/create-review` - Create a new review.

**Request Headers:**

```javascript
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF;
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c;
```

**Request Body:**

```json
{
  {
  "productId": "66e426f407e67bd384aa3285",
  "rating": 2,
  "comment": "Great product!"
}
}
```

## Technology Stack:

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- JWT
- Zod Validation
- bcrypt
- Nodemailer
- Cloudinary

## Project Structure

**builders/** a query builder class including some methods like search, filter, limit, pagination, fileds limiting and Query Meta

**errors/** all errors handler methods like CastError, duplicate entry error, zod errors, mongoose validation error

**interface/** contains error.ts file, which contains error types and index.ts contains Request interface

**middlewares/** auth, globalErrorHandler, notFound, validateRequest middlewares

**modules/** contains all models like user, auth, Product, Order, Payment, Review and testimonial. each module contains routes, controller, service, validation, constants, model and utils files

**routes/** Centralized route management for the API.

**utils/** Utility functions and helpers like appError, catchAsync, sendResponse.

**app.ts** The main entry point of the application.

**server.ts** Application database connection and server configuration

## Error Handling:

### **1\. No Data Found:**

When retrieving data, if the database collection is empty or no matching data is found, return the message: "No data found."

```elixir
{
  "success": false,
  "statusCode": 404,
  "message": "No Data Found",
  "data":[]
}
```

### **2. Error Handling:**

Implement proper error handling throughout the application. Use global error handling `middleware` to catch and handle errors, providing appropriate error responses with error messages.

**Error Response Object Should include the following properties:**

- success → false
- message → Error Type → Validation Error, Cast Error, Duplicate Entry
- errorMessages
- stack

**Sample Error Response**

```swift
   {
    "success": false,
    "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \\"user2@gmail.com\\" }",
    "errorMessages": [
        {
            "path": "",
            "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \\"user2@gmail.com\\" }"
        }
    ],
    "stack": "MongoServerError: E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \\"user2@gmail.com\\" }\\n    at H:\\\\next-level-development\\\\university-management-auth-service\\\\node_modules\\\\mongodb\\\\src\\\\operations\\\\insert.ts:85:25\\n    at H:\\\\next-level-development\\\\university-management-auth-service\\\\node_modules\\\\mongodb\\\\src\\\\cmap\\\\connection_pool.ts:574:11\\n    at H:\\\\next-level-development\\\\university-writeOrBuffer (node:internal/streams/writable:391:12)"
}
```

### **3\. Not Found Route:**

Implement a global "Not Found" handler for unmatched routes. When a route is not found, respond with a generic message: "Not Found.”

```json
{
  "success": false,
  "statusCode": 404,
  "message": "API Not Found"
}
```

### **5\. Zod Validation:**

The API employs Zod for input validation, ensuring data consistency. When validation fails, a 400 Bad Request status code is returned, accompanied by detailed error messages specifying the erroneous fields and reasons.

---

###
