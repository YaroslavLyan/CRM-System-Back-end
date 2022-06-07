const {body} = require('express-validator'); 
const knex = require('./database');

//Сheck the validity of the data on the backend
exports.registerValidators = [
    //valid email
  body('body.email').isEmail().withMessage('Please enter a valid email address')
  //check exists email in database
  .custom(async (value, {req}) => {
    try {
      const user = await knex.raw(`SELECT admins.email FROM admins WHERE admins.email='${req.body.body.email}'`);
      if (user.rowCount != 0) {
        return Promise.reject('Email is already taken');
      }
    } catch (e) {
      console.log(e);
    }
  })
  .normalizeEmail(),//Canonicalizes an email address
  body('body.passw', 'The password must be at least 6 characters long. Contain letters and numbers')
  .isLength({min: 6, max: 56}).isAlphanumeric()
  .trim(),//remove spaces
  body('body.name').isLength({min: 3}).withMessage('Name must be at least 3 characters'),
  body('body.rule').isNumeric(),
  body('body.active').isNumeric()
];