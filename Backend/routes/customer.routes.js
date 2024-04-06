import express from 'express';
import * as customerController from '../controllers/customer.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', [authMiddleware.verifyToken], customerController.getCustomers);
router.get('/:id', [authMiddleware.verifyToken], customerController.getCustomer);
router.post('/', [authMiddleware.verifyToken, authMiddleware.isManager], customerController.createCustomer);
router.put('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], customerController.updateCustomer);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], customerController.deleteCustomer);

export default router;