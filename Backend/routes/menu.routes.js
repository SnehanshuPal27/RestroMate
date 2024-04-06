import express from 'express';
import * as menuController from '../controllers/menu.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', [authMiddleware.verifyToken], menuController.getMenuItems);
router.get('/:id', [authMiddleware.verifyToken], menuController.getMenuItem);
router.post('/', [authMiddleware.verifyToken, authMiddleware.isManager], menuController.createMenuItem);
router.put('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], menuController.updateMenuItem);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], menuController.deleteMenuItem);

export default router;