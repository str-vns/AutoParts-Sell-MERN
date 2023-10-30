const User = require('../models/user')
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Login first to access this resource' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        console.log('User Object:', req.user); 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token. Login first to access this resource' });
    }
};

exports.authorizeRoles = (...roles) => {
	return (req, res, next) => {
        console.log(roles, req.user, req.body);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({message:`Role (${req.user.role}) is not allowed to acccess this resource`})
        }
        next()
    }
}