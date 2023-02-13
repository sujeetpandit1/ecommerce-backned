const ErrorHandler = require('../errorsHandlers/errorHandler');
const productModel = require('../modules/productModule')
const tryCatchError = require('../middleware/tryCatchError');


exports.createProduct = tryCatchError(async (req, res, next) =>{
    const product = await productModel.create(req.body)
    res.status(201).json({success: true, product})
});

exports.getAllProduct = tryCatchError(async (_req, res, _next) =>{
    const product = await productModel.find()
    res.status(200).json({success: true, count:product.length, product})
});

exports.getProductById = tryCatchError(async (req, res, next) =>{
    const product = await productModel.findById(req.params.id)
    if(!product) {return next(new ErrorHandler("Product Not Found", 404))}
    res.status(200).json({success: true,  product})
});

exports.updateProduct = tryCatchError(async (req, res, next) =>{
    let product = await productModel.findById(req.params.id)
    if(!product) {return next(new ErrorHandler("Product Not Found", 404))}

    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
        new:true, 
        runValidators:true, 
        useFindAndMdify: false})

        res.status(201).json({success: true, product}) 
});

exports.deleteProduct = tryCatchError(async (req, res, next) =>{
    let product = await productModel.findById(req.params.id)
    if(!product) {return next(new ErrorHandler("Product Not Found", 404))}

    product = await productModel.deleteOne()
    res.status(201).json({success: true, message: "Product Deleted Successfully"})
});  