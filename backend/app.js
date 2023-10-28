const express = require('express');
const app = express();
const cookieParser = require('coolie-parser');
const cors = require('cors');


app.use(cors());
app.use(express());
app.use(express.urlencoded({limit:"1000mb", extended: true }));
app.use(cookieParser());


module.exports = app
