const express = require('express');
const router = express.Router();
const { getShipping, makeShipping, updateShipping, deleteShipping, SingleShipping } = require('../controllers/shippingController');
const {isAuthenticatedUser} =require('../middlewares/auth');

router.get('/shipping',isAuthenticatedUser, getShipping)
router.get('/oneshipping/:id', SingleShipping)
router.post('/shipping/new',isAuthenticatedUser, makeShipping)
router.route('/shipping/:id',isAuthenticatedUser ).put(updateShipping).delete(deleteShipping);

module.exports = router;