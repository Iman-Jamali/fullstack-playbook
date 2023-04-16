# Todo App

The Todo App is a straightforward yet feature-rich application designed to demonstrate essential aspects of full stack development. It enables users to create an account, log in, and perform CRUD operations on todo items. This full stack application showcases crucial components such as authentication, authorization, database management, and deployment.

This directory is the root of the Todo App project. It contains the frontend and backend code for the application, as well as the deployment related files.

## [Frontend](./todo-fe)

The frontend of the Todo App is built using React. It provides users with the ability to register and log in, as well as manage their todo items.

## [Backend API](./todo-api)

The backend API of the Todo App is powered by Nest.js, a Node.js-based framework known for its scalability and versatility. This REST API supports user registration and authentication, along with CRUD operations for managing todo items. Additionally, it connects to a PostgreSQL database using TypeORM for efficient data management.

### [Deployment](./deployment)

The Todo App is containerized using Docker, which simplifies deployment across various environments.

**Local development**
The todo-app can be deployed using Docker Compose. First , create an `env` file in the project's root directory, following the structure of the `env.example` file provided. Then run `docker compose up` to start the application.

**Production environment**
App can be deployed to Kubernetes or OpenShift. Related files are provided in the `deployment` directory.
