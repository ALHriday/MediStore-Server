import { Request, Response } from "express";
import { medicinesServices } from "./medicine.service";

const createMedicine = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    try {
        const result = await medicinesServices.createMedicine(req.body, userId as string);

        res.status(201).json({
            success: true,
            message: "Medicine created successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


const updateMedicine = async (req: Request, res: Response) => {
    const id = req.params?.id;
    try {
        const result = await medicinesServices.updateMedicine(req.body, id as string);

        res.status(201).json({
            success: true,
            message: "Medicine updated successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const deleteMedicine = async (req: Request, res: Response) => {
    const id = req.params?.id;
    try {
        const result = await medicinesServices.deleteMedicine(id as string);

        res.status(200).json({
            success: true,
            message: "Medicine deleted successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const getMedicines = async (req: Request, res: Response) => {

    try {
        const result = await medicinesServices.getMedicines();

        res.status(200).json({
            success: true,
            message: "Medicines retrieved successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

const getMedicineById = async (req: Request, res: Response) => {

    try {
        const result = await medicinesServices.getMedicineById(req.params?.id as string);

        res.status(200).json({
            success: true,
            message: "Medicine retrieved successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const getMedicinesCategories = async (req: Request, res: Response) => {

    try {
        const result = await medicinesServices.getMedicinesCategories();
        res.status(200).json({
            success: true,
            message: "All Medicines categories retrieved successfully.",
            data: result,
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


export const medicinesController = {
    createMedicine,
    updateMedicine,
    deleteMedicine,
    getMedicines,
    getMedicineById,
    getMedicinesCategories,

}