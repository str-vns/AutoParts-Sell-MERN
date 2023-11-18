const Order = require('../models/orders')
const Product = require('../models/product');
const User = require('../models/user');
const sendEmail = require('../utility/sendEmail')

const mailsend = async (user, order) => {
    const message = `
    <section class="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
        <header>
            <h1> OnGarage </h1>     
        </header>

        <main class="mt-8">
            <h4 class="text-gray-700 dark:text-gray-200">Hi ${user.name},</h4>

            <p class="mt-2 leading-loose text-gray-600 dark:text-gray-300">
                Thank you for your order. Here are the Total Price details:
            </p>

            <ul>
                <li>Items Price: ${order.itemsPrice}</li>
                <li>Tax Price: ${order.taxPrice}</li>
                <li>Shipping Price: ${order.shippingPrice}</li>
                <li>Total Price: ${order.totalPrice}</li>
            </ul>

            <p class="mt-8 text-gray-600 dark:text-gray-300">
                Thanks, For Choosing <br>
                OnGarage
            </p>
        </main>
    </section>`;

    await sendEmail({
        email: user.email,
        subject: 'OnGarage Order Success',
        message
    });
}

exports.newOrder = async (req, res, next) => {
    const {
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo: req.body.ShippingCope,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    if (!order) {
        return res.status(400).json({ message: `Order not saved` })
    }
    const user = await User.findById(req.user._id);
    await mailsend(user, order);

    res.status(200).json({
        success: true,
        order
    })
}

exports.getSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('shippingInfo')
    
    if (!order) {
        return res.status(404).json({ message: `No Order found with this ID` })
    }
    res.status(200).json({
        success: true,
        order
    })
}

exports.myOrders = async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    if (!orders) {
        return res.status(404).json({ message: `Order found` })
    }

    res.status(200).json({
        success: true,
        orders
    })
}

exports.allOrders = async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
}
exports.updateOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Delivered') {
        return res.status(404).json({ message: `You have already delivered this order` })
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()
    await order.save()

    res.status(200).json({
        success: true,
    })
}

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false })
}

exports.deleteOrder = async (req, res, next) => {
    
    const order = await Order.findById(req.params.id)

    if (!order) {
        return res.status(404).json({ message: `No Order found with this ID` })
     
    }
    await order.remove()

    res.status(200).json({
        success: true
    })
}