import pool from '../config/database.js';

const getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM employees', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getById = (employeeId) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM employees WHERE employeeId = ?', [employeeId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

const update = (employeeId, employeeData) => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE employees SET ? WHERE employeeId = ?', [employeeData, employeeId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.affectedRows > 0);
      }
    });
  });
};

const remove = (employeeId) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM employees WHERE employeeId = ?', [employeeId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.affectedRows > 0);
      }
    });
  });
};

const create = (employeeData) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO employees SET ?', [employeeData], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.insertId);
      }
    });
  });
};

export {
  getAll,
  getById,
  update,
  remove,create
};