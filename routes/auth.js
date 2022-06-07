const {Router} = require('express');
const router = Router();


const { getUserToken, authorizationUser } = require('../controllers/auth');

router.post('/auth', authorizationUser);


//get user after validation token
router.get('/check', getUserToken);


module.exports = router;