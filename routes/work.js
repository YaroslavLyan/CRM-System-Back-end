const {Router} = require('express');
const router = Router();

const { getFullListStatus } = require('../controllers/status');
const { statusOrderOnFinal, statusOrderOnStart, statusOrderOnClose, statusOrderOnWait, statusOrderOnDel } = require('../controllers/change-status-order');


//get full list status
router.get('/status', getFullListStatus);


//(delete) change status order 
router.post('/del', statusOrderOnDel);

//(wait) change status order 
router.post('/wait', statusOrderOnWait);

//(final->close) change status order 
router.post('/close', statusOrderOnClose);

//change status order (dial->start)
router.post('/changeStatus', statusOrderOnStart);

//change status order (to final)
router.post('/changeStatusToFinal', statusOrderOnFinal);

module.exports = router;
