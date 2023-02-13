Backend for E-Commerce Application
This repository contains the code for the backend of an E-commerce application built using the MERN stack (MongoDB, Express, React, and Node.js).

Getting Started:-
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites;-
*Node.js and npm installed on your computer
*A MongoDB database set up and running

Installing:-
1. Clone the repository to your local machine:
git clone: https://github.com/[username]/e-commerce-backend.git

2.Navigate to the project directory:
cd e-commerce-backend

3. Install the dependencies:
npm install

4. Create a .env file in the root of the project and set the following environment variables:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/e-commerce

5. Start the development server:
npm run dev

::API Endpoints
The following API endpoints are available for interacting with the backend:

Product:-
GET /api/products: Retrieve a list of all products
GET /api/products/:id: Retrieve a single product by id
POST /api/products: Add a new product
PUT /api/products/:id: Update an existing product
DELETE /api/products/:id: Delete a product