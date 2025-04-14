const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product',required:true},
    name : { type:String,required:true},
    price: {type:Number, required:true},
    description:{ type:String},
    image:{type:String},
    quantity:{type:Number,required:true,default:1},
});
module.exports = mongoose.model('Cart',cartSchema);