const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const products = require('./routes/product')
const auths = require('./routes/auth')

app.use(cors());
app.use(express());
app.use(express.urlencoded({limit:"1000mb", extended: true }));
app.use(cookieParser());

app.use('/api/v1', products);
app.use('/api/v1', auths);
module.exports = app
