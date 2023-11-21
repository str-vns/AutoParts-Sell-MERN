const Order = require('../models/orders')
const Product = require('../models/product');
const User = require('../models/user');
const sendEmail = require('../utility/sendEmail')
const puppeteer = require('puppeteer');

const mailsend = async (user, order) => {
    const message = `
    <section style="container max-width: 2rem; padding: 0.75rem 1.5rem; margin: 0 auto; background-color: white;">
    <header style="display: flex; align-items: center; justify-content: center;">
        
    <svg xmlns='http://www.w3.org/2000/svg' width='40px' height='40px' viewBox='0 0 24 24' fill='none'>
    <path d='M7 20H4.6C4.03995 20 3.75992 20 3.54601 19.891C3.35785 19.7951 3.20487 19.6422 3.10899 19.454C3 19.2401 3 18.9601 3 18.4V9.0398C3 8.66343 3 8.47524 3.05919 8.31095C3.1115 8.16573 3.19673 8.03458 3.30819 7.9278C3.43428 7.80699 3.60625 7.73056 3.95018 7.5777L12 4L20.0498 7.5777C20.3938 7.73056 20.5657 7.80699 20.6918 7.9278C20.8033 8.03458 20.8885 8.16573 20.9408 8.31095C21 8.47524 21 8.66343 21 9.0398V18.4C21 18.9601 21 19.2401 20.891 19.454C20.7951 19.6422 20.6422 19.7951 20.454 19.891C20.2401 20 19.9601 20 19.4 20H17M7 20H17M7 20V14M17 20V14M7 14V10H17V14M7 14H17' stroke='#000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
    </svg>
    <h1 style="text-align: center;">OnGarage</h1>     
</header>

    <main style="margin-top: 2rem;  w3-container ">
        <div style="border-bottom: 1px solid black;">
        <h4>Hi <span style="color: orange;">${user.name},</span></h4>
        <p >
            Your Transaction was success 
        </p>
        <p style="margin: 0px; ">We will notify you when the order was Confimed</p>
<div>
        <div>
            <h4>Item You Ordered</h4>
            <p style="margin: 0px ">Order Id: ${order._id}</p>
            <p style="margin: 0px ">OrderDate: ${order.createdAt}</p>
        </div>
        ${order.orderItems && order.orderItems.map(item => `
        <div style="border-bottom: 1px solid black">
            <img src="${item.image}" style="height: 100px; width: 100px; margin-top: 10px;" />
            <p style="margin: 0px " >${item.name}</p>
            <p style="margin: 0px ">Quantity: ${item.quantity}</p>
            <p style="margin: 0px ">Price: ${item.price}</p>
        </div>
    `).join('')}
</div>


        <p style="margin-top: 2rem;  text-align: center;">
            Thanks, For Buying <br>
            OnGarage
        </p>
    </main>
</section>`;

    await sendEmail({
        email: user.email,
        subject: 'OnGarage Transaction Success',
        message
    });
}

const ConfirmMailSend = async (user, order) => {
    const message = `
    <section style="container max-width: 2rem; padding: 0.75rem 1.5rem; margin: 0 auto; background-color: white;">
    <header style="display: flex; align-items: center; justify-content: center;">
        
    <svg xmlns='http://www.w3.org/2000/svg' width='40px' height='40px' viewBox='0 0 24 24' fill='none'>
    <path d='M7 20H4.6C4.03995 20 3.75992 20 3.54601 19.891C3.35785 19.7951 3.20487 19.6422 3.10899 19.454C3 19.2401 3 18.9601 3 18.4V9.0398C3 8.66343 3 8.47524 3.05919 8.31095C3.1115 8.16573 3.19673 8.03458 3.30819 7.9278C3.43428 7.80699 3.60625 7.73056 3.95018 7.5777L12 4L20.0498 7.5777C20.3938 7.73056 20.5657 7.80699 20.6918 7.9278C20.8033 8.03458 20.8885 8.16573 20.9408 8.31095C21 8.47524 21 8.66343 21 9.0398V18.4C21 18.9601 21 19.2401 20.891 19.454C20.7951 19.6422 20.6422 19.7951 20.454 19.891C20.2401 20 19.9601 20 19.4 20H17M7 20H17M7 20V14M17 20V14M7 14V10H17V14M7 14H17' stroke='#000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
    </svg>
    <h1 style="text-align: center;">OnGarage</h1>     
</header>

    <main style="margin-top: 2rem;  w3-container ">
        <div style="border-bottom: 1px solid black;">
        <h4>Hi <span style="color: orange;">${user.name},</span></h4>
        <p >
            Your order <span style="color: orange;">${order._id}</span> has been approved.
        </p>
        <p style="margin: 0px; ">We will notify you when your order is shipped your item</p>
        <span>Download Reciept Here: </span><a href="http://localhost:4000/api/v1/order/${order._id}/receipt" style="
  display: inline-block;
  margin-bottom: 5px;
  background-color: #555555;
  border: none;
  color: white;
  padding: 2px 4px;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
 onmouseover="this.style.backgroundColor='#333333'; onmouseout="this.style.backgroundColor='#555555';">Download Receipt</a>
        </div>
<div>
        <div>
            <h4>ORDER DETAILS</h4>
            <p style="margin: 0px ">Order Id: ${order._id}</p>
            <p style="margin: 0px ">OrderDate: ${order.createdAt}</p>
        </div>
        ${order.orderItems && order.orderItems.map(item => `
        <div style="border-bottom: 1px solid black">
            <img src="${item.image}" style="height: 100px; width: 100px; margin-top: 10px;" />
            <p style="margin: 0px " >${item.name}</p>
            <p style="margin: 0px ">Quantity: ${item.quantity}</p>
            <p style="margin: 0px ">Price: ${item.price}</p>
        </div>
    `).join('')}
</div>
        <div style="border-bottom: 1px solid black">
            <h4>TOTAL PURCHASE</h4>
            <p style="margin: 0px ">Items Price: ${order.itemsPrice}</p>
            <p style="margin: 0px ">Tax Price: ${order.taxPrice}</p>
            <p style="margin: 0px ">Shipping Price: ${order.shippingPrice}</p>
            <p style="margin: 0px ">Total Price: ${order.totalPrice}</p>
        </div>

        <p style="margin-top: 2rem;  text-align: center;">
            Thanks, For Buying <br>
            OnGarage
        </p>
    </main>
</section>
`;

    await sendEmail({
        email: user.email,
        subject: 'OnGarage Order Confirmed',
        message
    });
}

const ShippedMailSend = async (user, order) => {
    const message = `
    <section style="container max-width: 2rem; padding: 0.75rem 1.5rem; margin: 0 auto; background-color: white;">
    <header style="display: flex; align-items: center; justify-content: center;">
        
    <svg xmlns='http://www.w3.org/2000/svg' width='40px' height='40px' viewBox='0 0 24 24' fill='none'>
    <path d='M7 20H4.6C4.03995 20 3.75992 20 3.54601 19.891C3.35785 19.7951 3.20487 19.6422 3.10899 19.454C3 19.2401 3 18.9601 3 18.4V9.0398C3 8.66343 3 8.47524 3.05919 8.31095C3.1115 8.16573 3.19673 8.03458 3.30819 7.9278C3.43428 7.80699 3.60625 7.73056 3.95018 7.5777L12 4L20.0498 7.5777C20.3938 7.73056 20.5657 7.80699 20.6918 7.9278C20.8033 8.03458 20.8885 8.16573 20.9408 8.31095C21 8.47524 21 8.66343 21 9.0398V18.4C21 18.9601 21 19.2401 20.891 19.454C20.7951 19.6422 20.6422 19.7951 20.454 19.891C20.2401 20 19.9601 20 19.4 20H17M7 20H17M7 20V14M17 20V14M7 14V10H17V14M7 14H17' stroke='#000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
    </svg>
    <h1 style="text-align: center;">OnGarage</h1>     
</header>

    <main style="margin-top: 2rem;  w3-container ">
        <div style="border-bottom: 1px solid black;">
        <h4>Hi <span style="color: orange;">${user.name},</span></h4>
        <p >
           This is to update you that your Order <span style="color: orange;">${order._id}</span> is shipped to storage facility
        </p>
        
<div>
        <div>
            <h4>Item You Ordered</h4>
            <p style="margin: 0px ">Order Id: ${order._id}</p>
            <p style="margin: 0px ">OrderDate: ${order.createdAt}</p>
        </div>
        ${order.orderItems && order.orderItems.map(item => `
        <div style="border-bottom: 1px solid black">
            <img src="${item.image}" style="height: 100px; width: 100px; margin-top: 10px;" />
            <p style="margin: 0px " >${item.name}</p>
            <p style="margin: 0px ">Quantity: ${item.quantity}</p>
            <p style="margin: 0px ">Price: ${item.price}</p>
        </div>
    `).join('')}
</div>


        <p style="margin-top: 2rem;  text-align: center;">
            Thanks, For Buying <br>
            OnGarage
        </p>
    </main>
</section>
`;

    await sendEmail({
        email: user.email,
        subject: 'OnGarage Shipping',
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
    const user = await User.findById(order.user);
    
    if (order.orderStatus === 'Delivered') {
        return res.status(404).json({ message: `You have already delivered this order` })
    }
    
    order.orderStatus = req.body.status
    
    if(order.orderStatus === 'Shipped')
    {
        await ShippedMailSend(user, order);
    }
    
    if(order.orderStatus === 'Delivered') {
        order.deliveredAt = Date.now()
    }
    
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
    const order = await Order.findByIdAndRemove(req.params.id)

    if (!order) {
        return res.status(404).json({ message: `No Order found with this ID` })

    }


    res.status(200).json({
        success: true
    })
}

exports.updateOrderConfirmation = async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    const user = await User.findById(order.user);

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    await ConfirmMailSend(user, order);
    order.orderConfirmation = "Confirmed"
    await order.save()

    res.status(200).json({
        success: true,
    })
}

async function getOrderById(id) {
    return await Order.findById(id);
  }
  
function generateHtml(order) {
    return `
    <section style="container max-width: 2rem; padding: 0.75rem 1.5rem; margin: 0 auto; background-color: white; ">
    <header style="border-bottom: 1px solid ">
    <h1 style="text-align: center;" >OnGarage</h1>   
      <p style="text-align: center; margin: 0;" >Reciept</p> 
</header>
<table style=" border-collapse: collapse;
  width: 100%; border-bottom: 1px solid ">
 <tr >
     <th style="padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
 
  padding: 8px;">Item</th>
     <th style="padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
 
  padding: 8px;">Quantity</th>
     <th style="padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  padding: 8px;" >Subtotal</th>
 </tr>
 ${order.orderItems && order.orderItems.map(item => `
 <tr>
 
     <td style="padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  padding: 8px;">${item.name}</td>
     <td style="padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  padding: 8px;">${item.quantity}</td>
     <td style="padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  padding: 8px;">${item.price}</td>
 </tr>
 `).join('')}
  
</table>
        <div style="border-bottom: 1px solid black">
            <h4>TOTAL PURCHASE</h4>
            <p style="margin: 0px  ">Items Price: ${order.itemsPrice}</p>
            <p style="margin: 0px ">Tax Price: ${order.taxPrice}</p>
            <p style="margin: 0px ">Shipping Price: ${order.shippingPrice}</p>
            <p style="margin: 0px ">Total Price: ${order.totalPrice}</p>
        </div>

        <p style="margin-top: 2rem;  text-align: center;">
            Thanks, For Buying <br>
            OnGarage
        </p>
    </main>
</section>
    `;
  }

  exports.pdfreciept = async (req, res, next) => {
    const orderId = req.params.id;
    const order = await getOrderById(orderId);
    const html = generateHtml(order);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({format: 'A4'});
    await browser.close();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=reciept.pdf`);
    res.send(pdf);
  };