import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';
import * as employeeModel from '../models/employee.model.js';

const signup = async (req, res) => {
  try {
    const { name, email, password, role,hireDate,salary } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newEmployee = {
      employeeName: name,
      email,
      password: hashedPassword,
      employeeRole: role,
      hireDate:hireDate,
      salary: salary
    };

    const employeeId = await employeeModel.create(newEmployee);
    res.status(201).send({ id: employeeId, message: 'Employee created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await employeeModel.findByEmail(email);

    if (!employee) {
      return res.status(404).send({ message: 'Employee not found' });
    }

    const passwordIsValid = await bcrypt.compare(password, employee.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: employee.employeeId, role: employee.employeeRole }, config.secret, { expiresIn: '1h' });

    res.status(200).send({ id: employee.employeeId, role: employee.employeeRole, accessToken: token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { signup, signin };