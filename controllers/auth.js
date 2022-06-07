const knex = require('../utils/database');
const bcrypt = require('bcryptjs');//Password encryption library
const jwt = require('jsonwebtoken');
const keys = require('../utils/config');//Encryption key. you can set any

const authorizationUser = async (req, res) => {
  try {
    const elemAuth = req.body;
    const query = `SELECT admins.id, admins.name, admins.passw, admins.rule, admins.active, admins.tel, admins.email
    FROM admins WHERE admins.tel = '${elemAuth.tel}'`;
    const { rows } = await knex.raw(query);
    if (!rows.length) {
      return res.sendStatus(400);
    } 
    const areSame = await bcrypt.compare(elemAuth.passw, rows[0].passw);

    if (areSame) {
      res.status(200).json({ token: jwt.sign({ phone: elemAuth.tel }, keys.tokenKey) });
    } else {
      res.sendStatus(400);
    }

  } catch (e) {
      console.log(e);

  }
};

//get user after validation token
const getUserToken= async (req, res) => {
    try {
      await res.json( req.user );
      console.log('sdf', req.user)
    } catch (e) {
        console.log(e);
  
    }
};

module.exports = { getUserToken, authorizationUser };