const {Router} = require('express');
const router = Router();

const { statusOrderOnDial } = require('../controllers/change-status-order');
const { editNameLid } = require('../controllers/edit-order');

//Edit lid name
router.post('/editName', editNameLid);

//change status from lid to dial and add manager id
router.post('/inDial/:id', statusOrderOnDial);

module.exports = router;