const { getOrderId } = require('../controllers/orders');
const { addNewOrder } = require('../controllers/add-order');
const { editOrder } = require('../controllers/edit-order');

const {Router} = require('express');
const router = Router();



// get order on ID
router.get('/:orderid', getOrderId);


//edit order from form-orders
router.post('/editOrders', editOrder);


//add order from form-orders
router.post('/addOrder', addNewOrder);


module.exports = router;