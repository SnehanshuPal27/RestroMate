import * as employeeModel from '../models/employee.model.js';

const getEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.getAll();
    res.status(200).send(employees);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await employeeModel.getById(employeeId);
    if (!employee) {
      return res.status(404).send({ message: 'Employee not found' });
    }
    res.status(200).send(employee);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updatedEmployee = req.body;
    const result = await employeeModel.update(employeeId, updatedEmployee);
    if (!result) {
      return res.status(404).send({ message: 'Employee not found' });
    }
    res.status(200).send({ message: 'Employee updated successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const result = await employeeModel.remove(employeeId);
    if (!result) {
      return res.status(404).send({ message: 'Employee not found' });
    }
    res.status(200).send({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { getEmployees, getEmployee, updateEmployee, deleteEmployee };