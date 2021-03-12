const { query } = require('express');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce_shop_project',
  password: `${env.process.DB_PASSWORD}`,
  port: 5432,
});

const getCustomers = (request, response) => {
  pool.query('SELECT * FROM customer', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getCustomerById = (request, response) => {
  const { id } = request.params;
  pool.query(
    `SELECT * FROM customer WHERE email like $1`,
    [`%${id}%`],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createCustomer = (request, response) => {
  // console.log(request.body);
  const { email, name, address, password, phone_nr } = request.body;

  pool.query(
    'INSERT INTO customer (email, name, address, password, phone_nr) values ($1, $2, $3, $4, $5)',
    [email, name, address, password, phone_nr],
    (error, result) => {
      if (error) {
        console.log(error.message);
        throw error;
      }
      // response.status(200).json({ success: true });
    }
  );
  pool.query(`SELECT * from customer`, (error, result) => {
    if (error) {
      console.log(error.message);
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

const deleteCustomers = (request, response) => {
  const { id } = request.body;

  pool.query(
    'DELETE FROM customer WHERE email = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
      response.status(200).send(`Customer deleted with Email: ${id}`);
    }
  );
};

const getSeller = (request, response) => {
  pool.query('SELECT * from seller', (error, results) => {
    if (error) throw error;

    response.status(200).json(results.rows);
  });
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  deleteCustomers,
  getSeller,
};
