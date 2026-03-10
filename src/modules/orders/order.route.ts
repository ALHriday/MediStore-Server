import express from "express";
import { Auth, UserRole } from "../../middlewares/auth";
import { orderController } from "./order.controller";

const router = express.Router();

router.post('/seller/orders', Auth(UserRole.ADMIN, UserRole.CUSTOMER), orderController.createOrder)
router.get('/seller/orders', Auth(UserRole.ADMIN, UserRole.CUSTOMER), orderController.getAllOrders)
router.get('/seller/orders/:id', Auth(UserRole.ADMIN, UserRole.CUSTOMER), orderController.getOrderById)
router.put('/seller/orders/:id', Auth(UserRole.ADMIN, UserRole.CUSTOMER), orderController.updateOrderStatusById)


export const orderRoutes = router;