const knex = require('../utils/database');

const selectStatus = `SELECT list_values.id, list_values.param, list_values.value
    FROM list_values
    WHERE list_values.param = 'status' or list_values.param = 'state'`;

const allStatus = `SELECT *
    FROM list_values`;

const statusListDel = `SELECT list_values.id, list_values.param, list_values.value
    FROM list_values
    WHERE list_values.param = 'delete_reason'`;

//get list status
const getStatusList = async (req, res) => {
    try {
        const { rows: status } = await knex.raw(selectStatus);
        res.status(200).json({ status });
      } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        }); 
      }
};


//get full list status
const getFullListStatus = async (req, res) => {
    try {
        const { rows: status } = await knex.raw(allStatus);
        res.status(200).json({ status });
      } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        }); 
      }
};

// get status delete
const getStatusDelete = async (req, res) => {
  try {
      const { rows: status } = await knex.raw(statusListDel);
      res.status(200).json({ status });
    } catch (e) {
      console.log(e);
      res.status(500).json({
          message: 'Server error'
      }); 
    }
};

module.exports = { getStatusDelete, getStatusList, getFullListStatus };
