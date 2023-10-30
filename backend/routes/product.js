const express = require('express');
const router = express.Router();
const upload = require('../utility/multer')
const { getproducts, GetOneProduct, newProducts, getAdminproducts, updateProducts, deleteProducts } = require('../controllers/productController');
const {isAuthenticatedUser} =require('../middlewares/auth');

//user
router.get('/products', getproducts)
router.get('/product/:id', GetOneProduct);

//admin
router.get('/admin/products', getAdminproducts);
router.post('/admin/product/new',  upload.single('images',10), newProducts);
router.route('/admin/product/:id', ).put(upload.array('images', 10), updateProducts).delete(deleteProducts);

module.exports = router;