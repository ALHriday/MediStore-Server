import express from "express";
import { Auth, UserRole } from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = express.Router();

router.get('/users', Auth(UserRole.ADMIN), userController.getAllUsers)
router.patch('/users/:id', Auth(UserRole.ADMIN), userController.updateUserById)

export const userRoutes = router;