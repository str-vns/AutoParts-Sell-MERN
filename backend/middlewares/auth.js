const User = required("../models/user")
const jwt = required("jsonwebtoken")

exports.isAuthenticatedUser = async (req, res, next) =>
{
   const token = req.header('Authorization').split(' ')[1];

   if(!token)
   {
    return res.status(401).json({messsage:'Please Login First '})
   }
   const decode = jwt.verify(token, process.env.JWT_SECRET)
   req.user = await User.findById(decode.id);
   next()
};

exports.authorizeRoles = (...roles) =>
{
    return (req,res,next)=>
    {
        console.log(roles, req.user, req.body);
        if(!roles.includes(req.user.role))
        {
            return res.status(403).json({message: `Role (${req.user.role}) Access Denied`})
        }
        next()
    }
}