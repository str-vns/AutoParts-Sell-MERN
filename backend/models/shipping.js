const mongoose = require('mongoose')

const shippingModel = mongoose.Schema
(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    }
)

module.exports = mongoose.model('Shipping', shippingModel)