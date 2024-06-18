# Movie_Rental_App
-----------

## Project Overview
  This is a Node.js application built with Express.js, using Mongoose for database management and Joi for input validation. The project includes several routes for managing customers, genres, movies, rentals, and user authentication.

-------------

## Dependencies
  * **bcrypt**: for password hashing
  * **dotenv**: for environment variable management
  * **express**: for building the application
  * **fawn**: for transaction management
  * **joi**: for input validation
  * **joi-objectid**: for validating MongoDB ObjectIDs
  * **jsonwebtoken**: for generating and verifying JSON Web Tokens
  * **lodash**: for utility functions
  * **mongoose**: for interacting with the MongoDB database
----------------------

## Routes
  * **Customers**
      - GET /: retrieve all customers
      - POST /: create a new customer
      - PUT /: update a customer
      - DELETE /: delete a customer
      - GET /:id: retrieve a customer by ID
    
  * **Genres**
      - GET /: retrieve all genres
      - POST /: create a new genre (requires authentication)
      - PUT /: update a genre (requires authentication)
      - DELETE /: delete a genre (requires authentication and admin privileges)

  * **Movies**
      - GET /: retrieve all movies
      - POST /: create a new movie
      - PUT /: update a movie
      - DELETE /: delete a movie
      - GET /:id: retrieve a movie by ID

  * **Rentals**
      - GET /: retrieve all rentals
      - POST /: create a new rental
      - GET /:id: retrieve a rental by ID

  * **User**
      - GET /me: retrieve the current user's information (requires authentication)
      - POST /: register a new user
--------------

## Authentication
  * Authentication is handled using JSON Web Tokens
  * Routes that require authentication are marked as such in the routes section above

## Environment Variables
  * The application uses environment variables for configuration. See the .env file for more information.

## Development
  * To start the application in development mode, run npm start
  * To run tests, run npm test

## License
  * This project is licensed under the MIT License.
