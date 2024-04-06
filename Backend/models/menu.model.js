import pool from '../config/database.js';

const getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM menu_items');
  return rows;
};

const getById = async (menuItemId) => {
  const [rows] = await pool.query('SELECT * FROM menu_items WHERE menuItemId = ?', [menuItemId]);
  return rows[0];
};

const create = async (menuItemData) => {
  const [result] = await pool.query('INSERT INTO menu_items SET ?', menuItemData);
  return result.insertId;
};

const update = async (menuItemId, menuItemData) => {
  const [result] = await pool.query('UPDATE menu_items SET ? WHERE menuItemId = ?', [menuItemData, menuItemId]);
  return result.affectedRows > 0;
};

const remove = async (menuItemId) => {
  const [result] = await pool.query('DELETE FROM menu_items WHERE menuItemId = ?', [menuItemId]);
  return result.affectedRows > 0;
};

export { getAll, getById, create, update, remove };