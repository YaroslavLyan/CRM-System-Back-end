const {Router} = require('express');
const router = Router();

const  { getOrdersEvents }  = require('../controllers/orders');
const  { updateDateFuture, deleteDateFuture }  = require('../controllers/edit-order');

//(events) orders requiring attention
router.get('/events', getOrdersEvents);

//update date future
router.post('/:newDateFuture', updateDateFuture);

//delete date future
router.post('/decided/:id', deleteDateFuture);


module.exports = router;