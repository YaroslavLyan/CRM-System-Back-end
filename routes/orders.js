const {Router} = require('express');
const router = Router();

const { ordersController, getOrdersClient, getOrdersArhive } = require('../controllers/orders');


//get full list order
router.get('/all', ordersController);

//request for a list of orders by customer(client_id)
router.post('/ordersClient', getOrdersClient);

//(archive) get orders list orders according to the filter
router.get('/archive', getOrdersArhive);

module.exports = router;