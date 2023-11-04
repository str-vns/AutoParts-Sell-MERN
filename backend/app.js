const express = require('express');
const session = require('express-session');
const app = express();
const cookie = require('cookie-parser')
const cors = require('cors')
const products = require('./routes/product')
const auths = require('./routes/auth')
const orders =  require('./routes/order')
const shipping = require('./routes/shipping');



app.use(cors());
app.use(express.json({limit:'1000mb'}));
app.use(express.urlencoded({limit:"1000mb", extended: true }));
app.use(cookie());

app.use('/api/v1', products);
app.use('/api/v1', auths);
app.use('/api/v1', orders);
app.use('/api/v1', shipping);



module.exports = app
