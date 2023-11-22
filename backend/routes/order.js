const express = require('express')
const router = express.Router();

const { newOrder,
		getSingleOrder,
	    myOrders,
	    allOrders,
	    updateOrder,
	    deleteOrder,
		updateOrderConfirmation,
		pdfreciept,
		totalSales,
		MonthlySales
	} = require('../controllers/orderController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.post('/order/new', isAuthenticatedUser, newOrder, );
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);
router.get('/orders/my', isAuthenticatedUser, myOrders);
router.get('/admin/orders/', isAuthenticatedUser, authorizeRoles('admin'), allOrders);

router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);
router.put('/admin/order/confirm/:id', isAuthenticatedUser, authorizeRoles('admin'), updateOrderConfirmation)
router.get('/order/:id/receipt', pdfreciept);

//dashboard
router.get('/admin/monthly', MonthlySales);
router.get('/admin/totalsales', totalSales)
module.exports = router;