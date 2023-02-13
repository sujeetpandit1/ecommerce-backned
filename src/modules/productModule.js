const mongoose = require('mongoose'); 

var productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Product Name"],
        trim: true
    },
    description:{
        type:String,
        required:[true, "Please Enter description"],
        trim: true
    },
    price:{
        type:Number,
        required:[true, "Please Enter Price"],
        maxLength:[8, " Price Cannot be exceed 8 length"],
    },
    rating:{
        type:Number,
        default:0,
    },
    images:[{
        public_id:{
            type: String,
            required:true
        },
        url:{
            type: String,
            required:true
        }
    }],
    category:{
        type: String,
        required:[true, "Please Enter Product Category"]
    },
    stock:{
        type: Number,
        required:[true, "Please Add Product Stocks"],
        maxLength:[4, " Product Cannot be exceed 8 length"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[{
        name: {
            type: String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }],
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Product', productSchema);