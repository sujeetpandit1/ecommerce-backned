const express= require('express')
const { isAuthenticatedUser, authorizedRole } = require('../auth/auth')
const { newOrder, myOrder, updateOrder } = require('../controllers/orderController')
const { createProduct, getAllProduct, updateProduct, deleteProduct, getProductById } = require('../controllers/productController')
const { registerUser, loginUser, logOut } = require('../controllers/userController')

const router=express.Router()


/**  ---------  Product API's ---------- **/
router.post('/createProduct', isAuthenticatedUser, authorizedRole("admin"), createProduct) 
router.get('/getProducts', getAllProduct) 
router.get('/getProductById/:id', getProductById) 
router.put('/updateProduct/:id', isAuthenticatedUser, authorizedRole("admin"), updateProduct) 
router.delete('/deleteProduct/:id', isAuthenticatedUser, authorizedRole("admin"), deleteProduct) 

/**  ---------  User API's ---------- **/
router.post('/createUser', registerUser)
router.post('/loginUser', loginUser)
router.get('/logout', logOut)

/**  ---------  Order API's ---------- **/
router.post('/newOrder', isAuthenticatedUser,newOrder)
router.get('/myOrder', isAuthenticatedUser, myOrder);
router.put('/updateOrder', isAuthenticatedUser, updateOrder);


router.get('/testing', (_req, res) => {
    return res.status(200).send({status: true, message: " Hello Testing API is Live"})})
router.all('/**', (_req, res) => {
    return res.status(404).send({status: false, message: " Requested API not Available"})})

module.exports=router; 