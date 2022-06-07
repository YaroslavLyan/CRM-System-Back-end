const knex = require('../utils/database');

//add order from form-orders
const addNewOrder = async (req, res) => {
  try {
    const el = req.body;       
    
    const notnull = (value) => {
      if (value == null || value == 'null' || value == '' || value == undefined) {
        return null
      }else {
        return `'${value}'`
      }
    }
    
    const editOrder = {client_id: el.new_clientId ? el.new_clientId : null,
            addr: el.order.addr,
            service: el.order.service,
            calc_summ: el.order.calc_summ,
            start_date: notnull(el.order.start_date),
            details: el.order.details,
            recived_summ: el.order.recived_summ,
            mmb_pay: el.order.mmb_pay,
            base_summ: el.order.base_summ,
            base_summ_details: el.order.base_summ_details,
            future_contact_date: notnull(el.order.future_contact_date),
            name: el.order.name,
            description: el.order.description,
            payment: el.order.payment,
            object_type: el.order.object_type,
            payment_type: el.order.payment_type,
            create_date: new Date().getTime(),
            manager_id: req.user.id,
            status: 2}
    await knex.insert(editOrder).into("orders");
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server error'
    }); 
  }

};

module.exports = { addNewOrder };