const knex = require('../utils/database');

const notnull = (value) => {
  if (value == null || value == 'null' || value == '') {
    return null
  }else {
    return `'${value}'`
  }
}

//(delete) change status order 
const statusOrderOnDel = async (req, res) => {
    try {
        const el = req.body;
        const editOrder = `UPDATE orders 
        SET status = ${el.status},
            close_date = '${(new Date()).toISOString()}',
            delete_reason = ${notnull(el.comment)}
            WHERE orders.id = ${el.id}`
        console.log("Not active", editOrder)
        // await knex.raw(query);
      } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        }); 
      }
};

//(wait) change status order 
const statusOrderOnWait = async (req, res) => {
  try {
      const el = req.body;
      const editOrder = `UPDATE orders 
      SET status = 8,
        future_contact_date: = ${notnull(el.future_contact_date)},
        resume = ${notnull(el.comment)},
      WHERE orders.id = ${el.id}`
      console.log("Not active", editOrder)
      // await knex.raw(query);
    } catch (e) {
      console.log(e);
      res.status(500).json({
          message: 'Server error'
      }); 
    }
};

//(final->close) change status order 
const statusOrderOnClose = async (req, res) => {
  try {
      const el = req.body;
      const editOrder = `UPDATE orders 
        SET state = 10,
          calc_summ = ${el.calc_summ},
          recived_summ = ${el.recived_summ},
          future_contact_date = ${notnull(el.future_contact_date)},
          close_date = ${notnull(el.close_date)}
        WHERE orders.id = ${el.id}`
      console.log('Not active', editOrder)
      // await knex.raw(editOrder);
    } catch (e) {
      console.log(e);
      res.status(500).json({
          message: 'Server error'
      }); 
    }
};

//change status order (dial->start)
const statusOrderOnStart = async (req, res) => {
  try {
    const el = req.body;
    const editOrder = `UPDATE orders 
        SET status = 4,
          client_id = ${el.clientId ? el.clientId : el.status.client_id},
          addr = ${notnull(el.status.addr)},
          service = ${notnull(el.status.service)},
          calc_summ = ${el.status.calc_summ},
          start_date = ${notnull(el.status.start_date)},
          details = ${notnull(el.status.details)}
        WHERE orders.id = ${el.id}`
    console.log('Not active', editOrder)
    // await knex.raw(query);
  } catch (e) {
      console.log(e);

  }
};

//change status order (to final)
const statusOrderOnFinal = async (req, res) => {
  try {
    const el = req.body;
    const editOrder = `UPDATE orders 
        SET status = 5,
          client_id = ${el.clientId ? el.clientId : el.status.client_id},
          addr = ${notnull(el.status.addr)},
          service = ${notnull(el.status.service)},
          calc_summ = ${el.status.calc_summ},
          start_date = ${notnull(el.status.start_date)},
          details = ${notnull(el.status.details)},
          recived_summ = ${el.status.recived_summ},
          mmb_pay = ${el.status.mmb_pay},
          base_summ = ${el.status.recived_summ},
          satisfaction_rating = ${el.status.satisfaction_rating},
          card_summ = ${el.status.recived_summ},
          card_num = ${notnull(el.status.card_num)},
          resume = ${notnull(el.status.resume)},
          base_summ_details = ${notnull(el.status.base_summ_details)}
        WHERE orders.id = ${el.id}`
    console.log('Not active', editOrder)
    // await knex.raw(editOrder);
  } catch (e) {
      console.log(e);

  }
};

const statusOrderOnDial = async (req, res) => {
    try {
      const id = req.params.id;
      const manager = req.user.id;
      const query = `UPDATE orders
      SET manager_id = ${manager}, status = 2
      WHERE id = ${id}`;
      // await knex.raw(query);
      console.log('Not active', query)
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: 'Server error'
      }); 
    }
};

module.exports = { statusOrderOnFinal, statusOrderOnStart, statusOrderOnClose, statusOrderOnWait, 
    statusOrderOnDial, statusOrderOnDel };
