const {Router} = require('express');
const router = Router();

const { getStatusDelete, getStatusList } = require('../controllers/status');

router.get('/status', getStatusList);

router.get('/statusdel', getStatusDelete);

module.exports = router;
