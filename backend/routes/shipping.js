const express = require('express');
const router = express.Router();
const { getShipping, makeShipping, updateShipping, deleteShipping } = require('../controllers/shippingController');
const {isAuthenticatedUser} =require('../middlewares/auth');

router.get('/shipping', getShipping)
router.get('/shipping/new', makeShipping)
router.route('/shipping/:id', ).put(updateShipping).delete(deleteShipping);

module.exports = router;