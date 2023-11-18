const { default: mongoose } = require("mongoose");
const mongoo = require("mongoose");
const { stringify } = require("querystring");

const productModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Product Name"],
    trim: true,
    maxlength: [150, "Product Name cant exceed to 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Enter the Price "],
    maxlength: [6, "Product price cant exceed to 6 digits"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Enter A Discription of a Product"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Choose a Category for this Product"],
    enum: {
      values: [
        "Battery",
        "Car Suspension",
        "Turbo",
        "Brake",
        "Chassis",
        "Air Filter",
        "Axle",
        "Shock Absorber",
        "Hood",
        "Alternator",
        "Clutch",
        "Compressor",
        "Air suspension",
        "Brake Caliper",
        "Suspension",
        "Nitrous",
        "Exhaust",
        "Interior Seats",
        "Steering Wheel",
        "Car Rims",
        "Fluids",
      ],
      message: "Please Select a Category for Product",
    },
  },
  seller: {
    type: String,
    required: [true, "Enter The Product Seller"],
  },
  stocks: {
    type: Number,
    required: [true, "Enter the quantity of the Product"],
    maxlength: [4, "Product cant exceed up to 4 digits"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0
},
  reviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,      
        }
    },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productModel);
