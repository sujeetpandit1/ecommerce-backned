const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    orderItems: [{
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            trim: true,
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        }
        
    }],
    product: {
        type: ObjectId,
        ref: "Product",
        required: [true, 'Product Id is required'],
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: [true, 'User Id is required'],
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
    },
    paidAt: {
        type: Date
    },
    itemsPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    orderStatus: {
        type: String,
        default: "pending",
        enum: ["pending", "completed", "cancelled"]
    },
    deliveredAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);