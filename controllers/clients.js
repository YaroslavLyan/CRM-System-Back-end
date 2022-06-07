const knex = require('../utils/database');

const selectClients = `SELECT *
FROM clients`;

//List clients
const getClientsList = async (req, res) => {
    try {
        const { rows: clients } = await knex.raw(`${selectClients} LIMIT ${req.query.limit} OFFSET ${req.query.offset}`);
      
        res.status(200).json({ clients });
      } catch (e) {
            console.log(e);
            res.status(500).json({
            message: 'Server error'
        }); 
        
      }
};

//find clients by tel
const findCliets = async (req, res) => {
    try {
        const elemTel = req.body;
        const query = `${selectClients}
        WHERE clients.tel LIKE '%${elemTel.tel}%'`;
        const { rows:clients } = await knex.raw(query);
        res.status(200).json({ clients });
    } catch (e) {
        console.log(e);

    }
};

//add new Clients
const addNewClients = async (req, res) => {
    try {
        const {fio, tel, email, site, messanger, card_num, card_summ, comment} = req.body.client;
        const query = `INSERT INTO clients (fio, tel, email, site, messanger, card_num, card_summ, comment) VALUES
        ('${fio}', '${tel}', '${email}', '${site}', '${messanger}', '${card_num}', ${card_summ || null}, '${comment}') RETURNING id`
        const { rows:client } = await knex.raw(query);

        res.status(200).json({ id: client[0].id });
    } catch (e) {
        console.log(e);

    }
};

module.exports = { addNewClients, findCliets, getClientsList };