const product = require("../models/product");
const Product = require("../models/product");
const APIFeatures = require("../utility/apiFeatures");
const cloudinary = require("cloudinary");
//CURD for products

// UserParts
// READ
exports.getproducts = async (req, res, next) => {
  const PerPage = 6;
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    apiFeatures.pagination(PerPage);
  const products = await apiFeatures.query;
  const filteredProductsCount = products.length;

  if (!products) {
    return res.status(500).json({
      success: false,
      message: "No Products Found",
    });
  }
  res.status(200).json(
    {
        success:true,
        count: products.length,
        productCount,
        products,
        PerPage,
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

	let imagingLinks = [];

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

	req.body.images = imagingLinks
  req.body.user = req.user.id;

  const products = await products.create(req.body);
  if(!products)
  return res.status(400).json({
    success: false,
    message: 'Product not created'
})
  res.status(201).json({
    success: true,
    products,
  });
};

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
exports.updateProducts = async (req,res,next) =>
{
    let products = await Product.findById(req.params.id);
    if(!product)
    {
        return res.status(404).json
        ({
            success: false,
            message: "The Product doesn't Exist ",
        })
    }
    let images = [];

    if(typeof req.body.images === 'string')
    {
        images.push(req.body.images)

    }
    else
    {
        images = req.body.images
    }

    if(images !== undefined)
    {
        for(let i = 0; i < product.images.length; i++)
        {
            const output =  await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
    }
    let imagingLinks = [];
    for (let i = 0; i < images.length; i++)
    {
        const result = await cloudinary.v2.uploader.upload(images[i],
        {
            folder: 'products'
        });
        imagingLinks.push 
        ({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imagingLinks;
    product = await Product.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        
        if(!product)
        {
            return res.status(404).json
            ({
                success: false,
                message: "The Product Not Updated ",
            })
        }
        res.status(200).json({
            success: true,
            product
        })
}

//DELETE
exports.deleteProducts = async (req,res,next)=>
{
    const products = await Product.findByIdAndDelete(req.params.id);
     
    if(!product)
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
