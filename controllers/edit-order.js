const knex = require('../utils/database');

//edit order from form-orders
const editOrder = async (req, res) => {
  try {
    const el = req.body;       

    const notnull = (value) => {
      if (value == null || value == 'null' || value == '') {
        return null
      }else {
        return `'${value}'`
      }
    }
      
    const editOrder = `UPDATE orders 
        SET client_id = ${el.new_clientId ? el.new_clientId : el.order.client_id},
            addr = ${notnull(el.order.addr)},
            service = ${notnull(el.order.service)},
            calc_summ = ${el.order.calc_summ},
            start_date = ${notnull(el.order.start_date)},
            details = ${notnull(el.order.details)},
            recived_summ = ${el.order.recived_summ},
            mmb_pay = ${el.order.mmb_pay},
            satisfaction_rating = ${el.order.satisfaction_rating},
            card_summ = ${el.order.card_summ},
            card_num = ${notnull(el.order.card_num)},
            resume = ${notnull(el.order.resume)},
            base_summ = ${el.order.base_summ},
            base_summ_details = ${notnull(el.order.base_summ_details)},
            future_contact_date = ${notnull(el.order.future_contact_date)},
            name = ${notnull(el.order.name)},
            description = ${notnull(el.order.description)},
            payment = ${notnull(el.order.payment)},
            close_date = ${notnull(el.order.close_date)},
            delete_reason = ${notnull(el.order.delete_reason)}
            WHERE orders.id = ${el.order_id}`

    const { rows: order } = await knex.raw(editOrder);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server error'
    }); 
  }

};

//Edit lid name
const editNameLid = async (req, res) => {
  try {
    const {body} = req.body;
    const query = `UPDATE orders
    SET name = '${body.name}'
    WHERE orders.id = ${body.id}`;
    const { rows: orders } = await knex.raw(query);
    res.status(200).json({ orders });
     
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server error'
    }); 
  }
};

//update date future
const updateDateFuture = async (req, res) => {
  try {
      const {id} = req.body
      const date = req.params.newDateFuture;
      const editOrder = `UPDATE orders 
        SET future_contact_date = '${date}'
        WHERE orders.id = ${id}`
        await knex.raw(editOrder);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: 'Server error'
      }); 
    }
};

const deleteDateFuture = async (req, res) => {
  try {
      const id = req.params.id;
      const editOrder = `UPDATE orders 
        SET future_contact_date = null
        WHERE orders.id = ${id}`
        await knex.raw(editOrder);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: 'Server error'
      }); 
    }
};

module.exports = { editOrder, editNameLid, updateDateFuture, deleteDateFuture };
