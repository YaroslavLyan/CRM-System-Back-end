const {Router} = require('express');
const router = Router();

const { addNewClients, findCliets, getClientsList } = require('../controllers/clients');

//List clients
router.get('/clients', getClientsList);

//find clients by tel
router.get('/findClient', findCliets);

//add new clients
router.post('/addClient', addNewClients);

module.exports = router;