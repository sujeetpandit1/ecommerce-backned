const productModel = require('../modules/productModule')


exports.createProduct = async (req, res, next) =>{
    const product = await productModel.create(req.body)
    res.status(201).json({success: true, product})
};

exports.getAllProduct = async (req, res, next) =>{
    const product = await productModel.find()
    res.status(200).json({success: true, count:product.length, product})
};

exports.getProductById = async (req, res, next) =>{
    const product = await productModel.findById(req.params.id)
    if(!product) res.status(400).json({success: false, message:" Product Not Found"});
    res.status(200).json({success: true,  product})
};

exports.updateProduct = async (req, res, next) =>{
    let product = await productModel.findById(req.params.id)
    if(!product) res.status(400).json({success: false, message:" Product Not Found"});

    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
        new:true, 
        runValidators:true, 
        useFindAndMdify: false})

        res.status(201).json({success: true, product}) 
};

exports.deleteProduct = async (req, res, next) =>{
    let product = await productModel.findById(req.params.id)
    if(!product) res.status(400).json({success: false, message:" Product Not Found"});

    product = await productModel.deleteOne()
    res.status(201).json({success: true, message: "Product Deleted Successfully"})
};