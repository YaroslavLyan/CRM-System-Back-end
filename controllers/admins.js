const knex = require('../utils/database');
const {registerValidators} = require('../utils/validators');//validation file
const {validationResult} = require('express-validator');//backend data validation
const bcrypt = require('bcryptjs');//Password encryption library

const selectAdmin = `SELECT admins.id, admins.name, admins.passw, admins.rule, admins.active, admins.tel, admins.email
FROM admins`;



//List admins
const getListAdmins = async (req, res) => {
    try {
        const { rows: admins } = await knex.raw(selectAdmin);
      
        res.json({ admins });
      } catch (e) {
            console.log(e);
            res.status(500).json({
            message: 'Server error'
        }); 
        
      }
};



//Delete admin
const deleteAdmins = async (req, res) => {
  try {
    const elemDel = req.body;
    const query = `DELETE FROM admins
    WHERE admins.id = ${elemDel.id}`;
    
    const { rows:admins } = await knex.raw(query);
    res.status(200).json({ admins });
  } catch (e) {
      console.log(e);

  }
};

const addNewAdmin = async (req, res) => {
  //registerValidators - validation file
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {//check if there are any errors
          res.status(422).send(`${errors.array()[0].msg}`);
          // 422 - errors data
          } else {
                const elem = req.body.body;
                const hashPassword = await bcrypt.hash(elem.passw, 10);//Password encryption
                const query = `INSERT INTO admins (name, passw, tel, email, rule, active) VALUES
                  ('${elem.name}', '${hashPassword}', '${elem.tel}', 
                  '${elem.email}', ${elem.rule}, ${elem.active})`
                const { rows:orders } = await knex.raw(query);
                res.status(200).json({ orders });
                
              }
    } catch (e) {
      console.log(e);
      
    }
};

module.exports = { deleteAdmins, getListAdmins, addNewAdmin };