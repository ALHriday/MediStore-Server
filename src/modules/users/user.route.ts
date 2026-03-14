import express from "express";
import { Auth, UserRole } from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = express.Router();

router.get('/admin/users', Auth(UserRole.ADMIN), userController.getAllUsers);
router.patch('/admin/users/:id', Auth(UserRole.ADMIN), userController.updateUserStatusById);

router.put('/users/profile', Auth(UserRole.CUSTOMER, UserRole.CUSTOMER, UserRole.ADMIN), userController.updateUserProfile);

export const userRoutes = router;