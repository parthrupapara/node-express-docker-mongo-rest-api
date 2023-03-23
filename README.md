# Node.js, Express, Docker Compose, and MongoDB User Authentication

This is a sample project that demonstrates how to build a Node.js web application with user authentication using Express, Docker Compose, and MongoDB.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

To run this project on your local machine, follow these steps:

1. Clone the repository to your local machine:

    `git clone https://github.com/<username>/<project-name>.git`

2. Navigate to the project directory:

    `cd <project-name>`

3. Create a file named .env in the root directory of the project, and add the following environment variables:

    `MONGO_URI=mongodb://db:27017/node-express-auth`

    `JWT_SECRET=supersecretkey`

    Replace `<your-mongodb-uri>` with the URI for your MongoDB database, and `<your-jwt-secret>` with a secret string of your choice.

4. Start the application by running the following command in your terminal:

    `docker-compose up --build`

## Endpoints

### Signup

To create a new user account, send a POST request to the /signup endpoint with a JSON payload containing a username and password:

`POST http://localhost:3000/signup`
```json
{
  "username": "johndoe",
  "password": "mypassword"
}
```
### Login

To authenticate a user and receive a JWT token, send a POST request to the /login endpoint with the same JSON payload as above:

`POST http://localhost:3000/login`

```json
{
  "username": "johndoe",
  "password": "mypassword"
}
```

### Protected

To access a protected endpoint that requires authentication, send a GET request to the /protected endpoint with a valid JWT token in the Authorization header:

`GET http://localhost:3000/protected`

`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Conclusions

In this project, we demonstrated how to implement user authentication in a Node.js web application using MongoDB for data storage and Docker for containerization. We created a simple API that allows users to sign up, log in, and access protected endpoints. We also used Docker Compose to set up the development environment, making it easy to get started with the project.

I hope this project has been helpful to you and provides a solid foundation for your own Node.js web applications with user authentication.