//jwt - session framework
const jwt = require('jsonwebtoken');
const keys = require('../utils/config');//Encryption key. you can set any
const knex = require('../utils/database');

const authMiddleware = (req, res, next) => {
    if (req.headers.authorization) {//check came token
      jwt.verify(
        req.headers.authorization.split(' ')[1],
        keys.tokenKey,
        async (err, payload) => {
          if (err) res.sendStatus(401); //token verification failed
          else if (payload) {
            const query = `SELECT * FROM admins 
                          WHERE admins.tel = '${payload.phone}'`;
            const { rows } = await knex.raw(query);
            
              if (rows[0]) {
                req.user = rows[0];
                next();
              } else {
                res.sendStatus(401);//not admin in BD
              }
  
            
          }
        }
      );
    }else { res.sendStatus(401); }
  };

  module.exports = { authMiddleware };