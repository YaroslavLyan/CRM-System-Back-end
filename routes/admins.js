const {Router} = require('express');
const router = Router();
const {registerValidators} = require('../utils/validators');//validation file


const { deleteAdmins, addNewAdmin, getListAdmins } = require('../controllers/admins');

// const selectAdmin = `SELECT admins.id, admins.name, admins.passw, admins.rule, admins.active, admins.tel, admins.email
// FROM admins`;



//List admins
router.get('/admins', getListAdmins);

//Add new admin
router.post('/addAdmin', registerValidators, addNewAdmin);


//Delete admin
router.post('/adminDel', deleteAdmins);

module.exports = router;