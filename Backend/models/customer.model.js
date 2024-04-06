import pool from '../config/database.js';

const getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM customers');
  return rows;
};

const getById = async (customerId) => {
  const [rows] = await pool.query('SELECT * FROM customers WHERE customerId = ?', [customerId]);
  return rows[0];
};

const create = async (customerData) => {
  const [result] = await pool.query('INSERT INTO customers SET ?', customerData);
  return result.insertId;
};

const update = async (customerId, customerData) => {
  const [result] = await pool.query('UPDATE customers SET ? WHERE customerId = ?', [customerData, customerId]);
  return result.affectedRows > 0;
};

const remove = async (customerId) => {
  const [result] = await pool.query('DELETE FROM customers WHERE customerId = ?', [customerId]);
  return result.affectedRows > 0;
};

export { getAll, getById, create, update, remove };