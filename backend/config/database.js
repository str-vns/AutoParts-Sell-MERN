const mongoose = require('mongoose');

const connectDB = async () =>
{
    mongoose.connect(process.env.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then (con => {
            console.log(`You are connected To MongoDB: ${con.connection.host}`);
        })
}

module.exports = connectDB;