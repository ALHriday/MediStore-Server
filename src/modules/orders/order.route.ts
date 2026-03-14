import express from "express";
import { Auth, UserRole } from "../../middlewares/auth";
import { orderController } from "./order.controller";

const router = express.Router();
// Customer
router.post('/orders', Auth(UserRole.CUSTOMER, UserRole.ADMIN), orderController.createOrder);

// Seller
router.get('/seller/orders', Auth(UserRole.SELLER, UserRole.ADMIN), orderController.getAllOrders);
router.get('/seller/orders/:id', Auth(UserRole.SELLER, UserRole.ADMIN), orderController.getOrderById);
router.put('/seller/orders/:id', Auth(UserRole.SELLER, UserRole.ADMIN), orderController.updateOrderStatusById);


export const orderRoutes = router;