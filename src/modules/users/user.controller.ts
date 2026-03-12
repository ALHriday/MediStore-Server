import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: "All users retrieved successfully.",
            data: result,
        });
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

const updateUserById = async (req: Request, res: Response) => {
    try {
        const result = await userService.updateUserById(req.body, req.params?.id as string);
        res.status(200).json({
            success: true,
            message: "User status updated successfully.",
            data: result,
        });
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

export const userController = {
    getAllUsers,
    updateUserById
} 