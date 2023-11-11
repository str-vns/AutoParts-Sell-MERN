const Shipping = require('../models/shipping')

exports.getShipping = async (req, res, next) =>
{

    if (req.user) {
        const shipping = await Shipping.find({ user_id: req.user.id });
        console.log(shipping)
        res.status(200).json({
            success: true,
            shipping
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'User is not authenticated'
        });
    }
}

exports.makeShipping = async (req, res, next) =>
{
    const shippingData = {
        ...req.body,
        user_id: req.user.id
    };
	const shippy = await Shipping.create(shippingData);
	if (!shippy)
		return res.status(400).json({
			success: false,
			message: 'shipping not created'
		})
	res.status(201).json({
		success: true,
		shippy
	})
}

exports.updateShipping = async (req, res, next) =>
{
    const shipping = await Shipping.findByIdAndUpdate(req.params.id,req.body, 
        {
          new: true,
          runValidators: true,
          useFindAndModify: false
        }
      );
      
      if (!shipping) {
        return res.status(404).json({
          success: false,
          message: "The shipping Not Updated ",
        });
      }
      
      res.status(200).json({
        success: true,
        shipping
      });
}

exports.deleteShipping = async (req, res, next) =>
{
    const shipping = await Shipping.findByIdAndDelete(req.params.id)
        
        if(!shipping)
        {
            return res.status(404).json
            ({
                success: false,
                message: "The shipping Not Find ",
            })
        }
        res.status(200).json({
            success: true,
            shipping
        })
}

exports.SingleShipping = async (req, res, next) =>
{
    const shipping = await Shipping.findById(req.params.id);
    if(!shipping)
    {
        return res.status(404).json
        ({
            success: false,
            message: "The Shipping doesn't Exist ",
        })
    }
    res.status(200).json({
        success: true,
        shipping
    })
   
}