const express = require('express');
const router = express.Router();
const upload = require('../utility/multer')
const { getproducts, GetOneProduct, newProducts, getAdminproducts, updateProducts, deleteProducts, createReview } = require('../controllers/productController');
const {isAuthenticatedUser, authorizeRoles} =require('../middlewares/auth');

//user
router.get('/products', getproducts)
router.get('/product/:id', GetOneProduct);

//admin
router.get('/admin/products', isAuthenticatedUser, authorizeRoles('admin'), getAdminproducts);
router.post('/admin/product/new', isAuthenticatedUser, upload.array('images', 10), newProducts);
router.route('/admin/product/:id', isAuthenticatedUser).put(upload.array('images', 10), updateProducts).delete(deleteProducts);


//review
router.put('/review',isAuthenticatedUser, upload.array('images', 10), createReview)

module.exports = router;