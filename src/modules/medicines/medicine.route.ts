import express from "express"
import { Auth, UserRole } from "../../middlewares/auth";
import { medicinesController } from "./medicine.controller";

const router = express.Router();

//Only seller can create Medicine.
router.post('/seller/medicines', Auth(UserRole.SELLER, UserRole.ADMIN), medicinesController.createMedicine);
router.put('/seller/medicines/:id', Auth(UserRole.SELLER, UserRole.ADMIN), medicinesController.updateMedicine);
router.delete('/seller/medicines/:id', Auth(UserRole.SELLER, UserRole.ADMIN), medicinesController.deleteMedicine);


// All user can get all medicines, medicines categories and also get medicine by id.
router.get('/medicines', Auth(), medicinesController.getMedicines);
router.get('/medicines/:id', Auth(), medicinesController.getMedicineById);
router.get('/categories', Auth(), medicinesController.getMedicinesCategories);


export const medicinesRoutes = router;