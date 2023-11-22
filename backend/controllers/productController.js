const Product = require("../models/product");
const Order = require('../models/orders')
const APIFeatures = require("../utility/apiFeatures");
const cloudinary = require("cloudinary");
const product = require("../models/product");
//CURD for products

// UserParts
// READ
exports.getproducts = async (req, res, next) => {
    const resPerPage = 8;
	const productsCount = await Product.countDocuments();
	const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter()
	apiFeatures.pagination(resPerPage);
	const products = await apiFeatures.query;
	const filteredProductsCount = products.length
	if (!products) {
		return res.status(404).json({
			success: false,
			message: 'No Products'
		})
	}
	res.status(200).json({
		success: true,
		count: products.length,
		productsCount,
		products,
		resPerPage,
		filteredProductsCount,
	})
};

//DETAILL PRODUCT
exports.GetOneProduct = async (req, res, next ) => {
    const product = await Product.findById(req.params.id);
    if(!product)
    {
        return res.status(404).json
        ({
            success: false,
            message: "The Product doesn't Exist ",
        })
    }
    res.status(200).json({
        success: true,
        product
    })
}


// ADMIN PART

// CREATE ADMIN
exports.newProducts = async (req, res, next) => {

  let images = []
	if (typeof req.body.images === 'string') {
		images.push(req.body.images)
	} else {
		images = req.body.images
	}

	let imagesLinks = [];

	for (let i = 0; i < images.length; i++) {
		let imageDataUri = images[i]
		try {
			const result = await cloudinary.v2.uploader.upload(`${imageDataUri}`, {
				folder: 'products',
				width: 150,
				crop: "scale",
			});

			imagesLinks.push({
				public_id: result.public_id,
				url: result.secure_url
			})

		} catch (error) {
			console.log(error)
		}

	}

	req.body.images = imagesLinks
	req.body.user = req.user.id;

	const product = await Product.create(req.body);
	if (!product)
		return res.status(400).json({
			success: false,
			message: 'Product not created'
		})
	res.status(201).json({
		success: true,
		product
	})
}

// READ ADMIN
exports.getAdminproducts = async (req, res, next) => {
    const products = await Product.find();
    if (!products) {
      return res.status(500).json({
        success: false,
        message: "No Products Found",
      });
    }
    res.status(200).json(
      {
          success:true,
          products,
      })
  };

//UPDATE
exports.updateProducts = async (req,res,next) => {
	let product = await Product.findById(req.params.id);

if (!product) {
  return res.status(404).json({
    success: false,
    message: 'Product not found'
  });
}

let images = req.body.images || [];


if (images.length > 0) {

  for (let i = 0; i < product.images.length; i++) {
    try {
      let imageDataUri = product.images[i];
      const result = await cloudinary.v2.uploader.destroy(`${imageDataUri.public_id}`);
    } catch (error) {
      console.log(error);
    }
  }

  let imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    try {
      let imageDataUri = images[i];
      const result = await cloudinary.v2.uploader.upload(`${imageDataUri}`, {
        folder: 'products',
        width: 150,
        crop: 'scale',
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  }

  req.body.images = imagesLinks;
} else {

  req.body.images = product.images;
}

product = await Product.findByIdAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators: true,
  useFindAndModify: false,
});

if (!product) {
  return res.status(400).json({
    success: false,
    message: 'Product not updated',
  });
}

return res.status(200).json({
  success: true,
  product,
});
}

//DELETE
exports.deleteProducts = async (req,res,next)=>
{
    const products = await Product.findByIdAndDelete(req.params.id);
     
    if(!products)
    {
        return res.status(404).json
        ({
            success: false,
            message: "The Product Not Deleted",
        })
    }
    res.status(200).json({
        success: true,
        message: "The Product Has been Delete",
    })
}

// REVIEW
exports.createReview = async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    let images = req.body.images;

if (!images) {
  images = [];
} else if (typeof images === 'string') {
  images = [images];
}

let imagesLinks = [];

for (let i = 0; i < images.length; i++) {
  let imageDataUri = Array.isArray(images[i]) ? images[i][0] : images[i];

  if (typeof imageDataUri !== 'string') {
    console.error("Invalid image data URI:", imageDataUri);
    continue;
  }

  try {
    const result = await cloudinary.v2.uploader.upload(imageDataUri, {
      folder: 'products',
      width: 150,
      crop: 'scale',
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    console.log(error);
  }
}
    
    const review = {
      user: req.user._id,
      name: req.user.name,
      avatar: req.user.avatar,
      rating: Number(rating),
      comment,
      images: imagesLinks,
    };
    
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
    
    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
          review.images = imagesLinks;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    
    await product.save({ validateBeforeSave: false });
    
    if (!product)
      return res.status(400).json({
        success: false,
        message: 'Review not posted',
      });
    
    return res.status(200).json({
      success: true,
    })
}

exports.getReviewsProduct = async (req, res, next) => 
 { 
  const product = await Product.findById(req.query.id);
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  })

}

exports.deleteReviews = async (req, res, next) =>
{
  const product = await Product.findById(req.query.productId);
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    return res.status(200).json({
        success: true
    })
}

exports.productCommonSales = async (req, res, next) => {
  try {
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$itemsPrice" }
        },
      },
    ]);

    const sales = await Order.aggregate([
      { $project: { _id: 0, "orderItems": 1, totalPrice: 1 } },
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: { product: "$orderItems.name" },
          total: { $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] } }
        },
      },
    ]);

    if (!totalSales || totalSales.length === 0) {
      return res.status(404).json({
        message: 'No total sales found'
      });
    }

    if (!sales || sales.length === 0) {
      return res.status(404).json({
        message: 'No product sales found'
      });
    }

    const totalPercentage = sales.map(item => {
      const percent = Number(((item.total / totalSales[0].total) * 100).toFixed(2));
      return {
        name: item._id.product,
        percent
      };
    });

    res.status(200).json({
      success: true,
      totalPercentage,
      sales,
      totalSales
    });
  } catch (error) {
    console.error('Error during sales calculation:', error);
    res.status(500).json({
      message: 'An error occurred during sales calculation'
    });
  }
}

exports.productRevenue = async (req, res, next) => {
  try {
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$itemsPrice" }
        },
      },
    ]);

    const sales = await Order.aggregate([
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: "$orderItems.name",
          totalRevenue: { $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] } }
        },
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    if (!totalSales || totalSales.length === 0) {
      return res.status(404).json({
        message: 'No total sales found'
      });
    }

    if (!sales || sales.length === 0) {
      return res.status(404).json({
        message: 'No product sales found'
      });
    }

    const totalPercentage = sales.map(item => {
      const percent = Number(((item.total / totalSales[0].total) * 100).toFixed(2));
      return {
        name: item._id.product,
        percent
      };
    });

    res.status(200).json({
      success: true,
      sales,
      totalSales
    });
  } catch (error) {
    console.error('Error during sales calculation:', error);
    res.status(500).json({
      message: 'An error occurred during sales calculation'
    });
  }
}

exports.productStocky = async (req, res, next) => {
  const ItemStock = await product.aggregate([
    {
      $match: {
        stock: 0 
      }
    },
    {
      $group: {
        _id: "$stock",
        count: { $sum: 1 } 
      }
    }
  ])

  let count = 0;
  if (ItemStock.length > 0) {
    count = ItemStock[0].count;
  }

  res.status(200).json({
    success: true,
    ItemStock: count
  })
}