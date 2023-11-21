const mongoose = require('mongoose')

const orderModel =  mongoose.Schema(
   {
    shippingInfo:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipping',
        required: true
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems:
    [
        {
            name:
            {
                type: String,
                required: true
            },
            quantity:
            {
                type: Number,
                required: true
            },
            image:
            {
                type: String,
                required: true
            },
            price:
            {
                type: Number,
                required: true
            },
            product:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
        }
    ],
    paymentInfo:
    {
        id:
        {
            type:String
        },
        status:
        {
            type:String
        }
    },
    paidAt:
    {
      type: Date
    },

    itemsPrice:
    {
        type:Number,
        required: true,
        default: 0.00
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },
    orderConfirmation: {
        type: String,
        required: true,
        default: 'NotConfirm'
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

   }

)

module.exports = mongoose.model('Order', orderModel)