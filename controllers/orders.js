const knex = require('../utils/database');

const orderQuery = `SELECT orders.id, orders.future_contact_date, orders.create_date, 
orders.start_date, orders.name, orders.addr, clients.fio, clients.tel, orders.calc_summ, 
orders.recived_summ, payment.value, orders.payment, orders.description, orders.details, orders.status,
orders.card_num, orders.card_summ, orders.satisfaction_rating, orders.resume, adm.name as admin_name,
orders.base_summ, orders.state, orders.final_date, man.name as executor_name, orders.close_date,
orders.manager_id, list_values.value as status_value, lv3.value as object_value, orders.service,
orders.base_summ_details, orders.object_type, orders.service, base_summ_details, orders.mmb_pay,
orders.delete_reason, orders.client_id, orders.payment_type, orders.delete_reason
FROM orders 
JOIN clients ON orders.client_id = clients.id
JOIN admins as adm ON orders.manager_id = adm.id
left JOIN admins as man ON orders.executor_id = man.id
JOIN list_values ON orders.status = list_values.id
JOIN payment ON orders.payment_type = payment.id
JOIN list_values as lv2 ON orders.state = lv2.id 
JOIN list_values as lv3 ON orders.object_type = lv3.id`;

const adminQuery = `SELECT admins.id as admin_id, admins.name as filtr_admin
FROM admins 
`;


const ordersController = async (req, res) => {
  try {
    if(req.user.rule != 100) {
      const managerOrders = `${orderQuery} WHERE orders.manager_id = ${req.user.id}`;
      const { rows: orders } = await knex.raw(managerOrders);
      const { rows: admins } = await knex.raw(adminQuery);
      res.status(200).json({ orders, admins });
    } else {
      const { rows: orders } = await knex.raw(orderQuery);
      const { rows: admins } = await knex.raw(adminQuery);
      res.status(200).json({ orders, admins });
    }

      
  } catch (e) {
    console.log('4', e);
    res.status(500).json({
      message: 'Server error'
    }); 
    
  }
};

// get order on ID
const getOrderId = async (req, res) => {
  try {
    const el = req.params.orderid;
    const OrdersId = `${orderQuery} WHERE orders.id = ${el}`;
    const { rows: order } = await knex.raw(OrdersId); 
    if (order.length) {
      res.status(200).json({ order: order[0] });
    } else {
      res.status(400).json({
        message: 'order not found'
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server error'
    }); 
  }
};

//(client_id) get list orders by customer
const getOrdersClient = async (req, res) => {
  try {
    const el = req.body;

    const query = `${orderQuery} where orders.client_id = ${el.id}`;
    

    const { rows: orders } = await knex.raw(query);
    res.status(200).json({ orders });
    
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server error'
    }); 
  }
};

//(events) orders requiring attention
const getOrdersEvents = async (req, res) => {
  try {
  let filter = `orders.future_contact_date >= '${req.query.dateFrom}' 
  and orders.future_contact_date <= '${req.query.dateBefore}'`;
    if(req.user.rule != 100) {
      const listEvents = `${orderQuery} WHERE orders.manager_id = ${req.user.id} and ${filter}`;
      const { rows: events } = await knex.raw(listEvents);
      res.status(200).json({ events });
    } else {
      const listEvents = `${orderQuery} WHERE ${filter}`;
      const { rows: events } = await knex.raw(listEvents);
      res.status(200).json({ events });
    }       
  } catch (e) {
      console.log(e);
      res.status(500).json({
        message: 'Server error'
      }); 
  }
};

//(archive) get orders list orders according to the filter
const getOrdersArhive = async (req, res) => {
  try {
  let filter = `and orders.close_date >= '${req.query.dateFrom}'
  and orders.close_date <= '${req.query.dateBefore}'`;
  if(req.query.manager != 'all') {filter = filter + ` and orders.manager_id = ${req.query.manager}`}
  if(req.query.mmb != 'all') {filter = filter + ` and orders.executor_id = ${req.query.mmb}`}
  
    if(req.user.rule != 100) {
      const managerOrders = `${orderQuery} WHERE orders.manager_id = ${req.user.id} orders.state = 10`;
      const { rows: orders } = await knex.raw(managerOrders);
      const { rows: admins } = await knex.raw(adminQuery);
      res.status(200).json({ orders, admins });
    } else {
      const managerOrders = `${orderQuery} WHERE orders.state = 10 ${filter}`;
      const { rows: orders } = await knex.raw(managerOrders);
      const { rows: admins } = await knex.raw(adminQuery);
      res.status(200).json({ orders, admins });
    }

     
  } catch (e) {
      console.log('4', e);
      res.status(500).json({
        message: 'Server error'
      }); 
  }
}

module.exports = { ordersController, getOrderId, getOrdersClient, getOrdersEvents, getOrdersArhive };
