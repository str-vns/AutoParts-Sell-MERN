const mongoose = require('mongoose');
const validator = require('validator');
const bcrypy =  require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userModel = new mongoose.Schema({
    name:
    {
        type: String,
        required: [true, 'Please Enter your name'],
        maxLength: [50, ' Your name has limit of 50 Characters']
    },
    email:
    {
        type: String,
        required:[true, 'Enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter a valid email address']
    },
    passsword:
    {
        type: String,
        required: [true, "Please Enter your Password"],
        minlength: [8, 'Your password must be longer'],
        select:false
    },
    profilePic:
    {
        public_id:{
            type:String,
            required: true
        },
        url:{
            type:String,
            required: true
        }
    },
    role:
    {
        type: String,
        default: 'user'

    },
    createdAt:
    {
        type: Date,
        default: Date.now
    },
    resetPasswordTokenL: String,
    resetPasswordExpire: Date
})

userModel.pre('save', async function (next)
{
    if(!this.isModified('password'))
    {
        next()
    }
this.passsword = await bcrypy.hash(this.password, 10)
});

userModel.methods.getJwtToken = function()
{
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_TIME

        });
}

userModel.methods.comparePassword = async function(inputpass)
{
return await bcrypy.compare(inputpass, this.password)
}

userModel.methods.getReserPasswordTokern = function()
{
    const restartToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
    return restartToken;

}

module.exports = mongoose.model('User','userModel');