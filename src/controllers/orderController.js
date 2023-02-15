const orderModel = require('../modules/orderModule')
const ErrorHandler = require('../errorsHandlers/errorHandler');
const productModel = require('../modules/productModule')
const userModel = require('../modules/userModule')
const tryCatchError = require('../middleware/tryCatchError');


exports.newOrder = tryCatchError(async(req,res,next)=>{
    const{orderItems,paymentInfo,itemsPrice,totalPrice,product,user} = req.body;
    
    const order = await orderModel.create({
        orderItems,
        paymentInfo,
        itemsPrice,
        totalPrice,
        paidAt: Date.now(),
        product:req.body.product,
        user: req.body.user
        
    })
    let checkUser = await userModel.findById(user);
    if(!checkUser) return next(new ErrorHandler("User Not Found", 401));
    let checkProduct = await productModel.findById(product);
    if(!checkProduct) return next(new ErrorHandler("Product Not Found", 401));

    res.status(201).json({success:true, order})
});

exports.myOrder = tryCatchError(async (req, res, next) => {
    const orders = await orderModel.find();
    res.status(200).json({ success: true, orders });
  });

  exports.updateOrder = tryCatchError(async (req, res, next) => {
    const { orderId, orderStatus } = req.body;
  
    const findOrder = await orderModel.findById(orderId);
    if (!findOrder) {
      return res.status(400).send({
        success: false,
        message: 'Order Id is incorrect.',
      });
    }
  
    if (findOrder.orderStatus === 'completed') {
      return next(new ErrorHandler('Order status is Completed', 400));
    }
  
    findOrder.orderItems.forEach(async (item) => {
      await productModel.findByIdAndUpdate(item.product, {
        $inc: { quantity: -item.quantity },
      });
  
      item.quantity = 0;
      item.price = 0;
    });
  
    findOrder.orderStatus = orderStatus;
    findOrder.itemsPrice = 0;
    findOrder.totalPrice = 0;
  
    if (orderStatus === 'completed') {
      findOrder.paidAt = Date.now();
    }
  
    const updatedOrder = await findOrder.save();
  
    let message = 'Order updated';
    if (orderStatus === 'completed') {
      message = 'Order completed';
    }
  
    res.status(200).json({
      success: true,
      message,
      findOrder: updatedOrder,
    });
  });

