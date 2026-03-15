import express from "express";
import { Auth, UserRole } from "../../middlewares/auth";
import { orderController } from "./order.controller";

const router = express.Router();
// Customer
router.post('/orders', Auth(UserRole.CUSTOMER), orderController.createOrder);
router.get('/orders', Auth(UserRole.CUSTOMER), orderController.getUserOrders);
router.get('/orders/:id', Auth(UserRole.CUSTOMER), orderController.getOrderById);

// Seller
router.get('/seller/orders', Auth(UserRole.SELLER), orderController.getAllOrders);
router.put('/seller/orders/:id', Auth(UserRole.SELLER), orderController.updateOrderStatusById);


export const orderRoutes = router;