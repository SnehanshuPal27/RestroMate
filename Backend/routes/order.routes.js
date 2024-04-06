import express from 'express';
import * as orderController from '../controllers/order.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', [authMiddleware.verifyToken], orderController.getOrders);
router.get('/:id', [authMiddleware.verifyToken], orderController.getOrder);
router.post('/', [authMiddleware.verifyToken, authMiddleware.isServer], orderController.createOrder);
router.put('/:id', [authMiddleware.verifyToken, authMiddleware.isServer], orderController.updateOrder);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], orderController.deleteOrder);

export default router;