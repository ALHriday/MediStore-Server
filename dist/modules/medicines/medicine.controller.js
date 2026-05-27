import { medicinesServices } from "./medicine.service.js";
const createMedicine = async (req, res) => {
    const userId = req.user?.id;
    try {
        // const result = await medicinesServices.createMedicine(req.body, userId as string, req.file?.path);
        const result = await medicinesServices.createMedicine(req.body, userId);
        res.status(201).json({
            success: true,
            message: "Medicine created successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const updateMedicine = async (req, res) => {
    const id = req.params?.id;
    const currentUserId = req.user?.id;
    try {
        const result = await medicinesServices.updateMedicine(req.body?.stock, id, currentUserId);
        res.status(201).json({
            success: true,
            message: "Medicine stock updated successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const deleteMedicine = async (req, res) => {
    const id = req.params?.id;
    const currentUserId = req.user?.id;
    try {
        const result = await medicinesServices.deleteMedicine(id, currentUserId);
        res.status(200).json({
            success: true,
            message: "Medicine deleted successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const getMedicines = async (req, res) => {
    const { search, manufacturer, sort, categoryId, skip } = req.query;
    const skipItem = skip ? Number(skip) : 0;
    try {
        const result = await medicinesServices.getMedicines(search, manufacturer, sort, categoryId, skipItem);
        res.status(200).json({
            success: true,
            message: "Medicines retrieved successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const getMedicineById = async (req, res) => {
    try {
        const result = await medicinesServices.getMedicineById(req.params?.id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Medicine Not Found!.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Medicine retrieved successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const getMedicinesCategories = async (req, res) => {
    try {
        const result = await medicinesServices.getMedicinesCategories();
        res.status(200).json({
            success: true,
            message: "All Medicines categories retrieved successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const getAllCategory = async (req, res) => {
    try {
        const result = await medicinesServices.getAllCategory();
        res.status(200).json({
            success: true,
            message: "All Medicines category retrieved successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const getMedicineByUser = async (req, res) => {
    try {
        const result = await medicinesServices.getMedicineByUser(req.user?.id);
        res.status(200).json({
            success: true,
            message: "All Medicines retrieved successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const getStats = async (req, res) => {
    const { id, role } = req.user;
    try {
        const result = await medicinesServices.getStats(id, role);
        res.status(200).json({
            success: true,
            message: "success.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
const getMedicinesLen = async (req, res) => {
    try {
        const result = await medicinesServices.getMedicinesLen();
        res.status(200).json({
            success: true,
            message: "success.",
            data: result,
        });
    }
    catch (error) {
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
    getStats,
    getMedicinesLen,
    getAllCategory,
    getMedicineByUser,
};
