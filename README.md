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

/**  ---------  Product API's ---------- **/
router.post('/createProduct', isAuthenticatedUser, authorizedRole("admin"), createProduct) : Add a new product
router.get('/getProducts', getAllProduct) : Retrieve a list of all products
router.get('/getProductById/:id', getProductById) : Retrieve a single product by id
router.put('/updateProduct/:id', isAuthenticatedUser, authorizedRole("admin"), updateProduct) : Update an existing product
router.delete('/deleteProduct/:id', isAuthenticatedUser, authorizedRole("admin"), deleteProduct) : Delete a produc

/**  ---------  User API's ---------- **/
router.post('/createUser', registerUser): Add a new user
router.post('/loginUser', loginUser): Login user
router.get('/logout', logOut) : Logout user

/**  ---------  Order API's ---------- **/
router.post('/newOrder', isAuthenticatedUser,newOrder): Place a new order
router.get('/myOrder', isAuthenticatedUser, myOrder): Retrieve a list of all orders for the current user
router.put('/updateOrder', isAuthenticatedUser, updateOrder): Update an existing data

Built With
Express - The web framework used
MongoDB - The database used
