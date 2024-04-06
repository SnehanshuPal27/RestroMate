import pool from '../config/database.js';

const getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM orders');
  return rows;
};

const getById = async (orderId) => {
  const [rows] = await pool.query('SELECT * FROM orders WHERE orderId = ?', [orderId]);
  return rows[0];
};

const create = async (orderData) => {
  const [result] = await pool.query('INSERT INTO orders SET ?', orderData);
  return result.insertId;
};

const update = async (orderId, orderData) => {
  const [result] = await pool.query('UPDATE orders SET ? WHERE orderId = ?', [orderData, orderId]);
  return result.affectedRows > 0;
};

const remove = async (orderId) => {
  const [result] = await pool.query('DELETE FROM orders WHERE orderId = ?', [orderId]);
   return result.affectedRows > 0;}
export{getAll,getById,create,update,remove};
   