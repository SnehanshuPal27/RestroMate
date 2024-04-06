import express from 'express';
import * as employeeController from '../controllers/employee.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', [authMiddleware.verifyToken, authMiddleware.isManager], employeeController.getEmployees);
router.get('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], employeeController.getEmployee);
router.put('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], employeeController.updateEmployee);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], employeeController.deleteEmployee);

export default router;