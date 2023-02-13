const express= require('express')
const { createProduct, getAllProduct, updateProduct, deleteProduct, getProductById } = require('../controllers/productController')

const router=express.Router()


/**  ---------  API's ---------- **/
router.post('/createProduct', createProduct) 
router.get('/getProducts', getAllProduct) 
router.get('/getProductById/:id', getProductById) 
router.put('/updateProduct/:id', updateProduct) 
router.delete('/deleteProduct/:id', deleteProduct) 


router.get('/testing', (_req, res) => {
    return res.status(200).send({status: true, message: " Hello Testing API is Live"})})
router.all('/**', (_req, res) => {
    return res.status(404).send({status: false, message: " Requested API not Available"})})

module.exports=router; 