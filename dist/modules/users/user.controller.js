import { userService } from "./user.service.js";
const getAllUsers = async (req, res) => {
    try {
        const result = await userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: "All users retrieved successfully.",
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
const updateUserStatusById = async (req, res) => {
    try {
        const result = await userService.updateUserStatusById(req.body, req.params?.id);
        res.status(200).json({
            success: true,
            message: "User status updated successfully.",
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
const updateUserProfile = async (req, res) => {
    try {
        // const result = await userService.updateUserProfile(req.body, req.user?.id as string, req.file?.path);
        const result = await userService.updateUserProfile(req.body, req.user?.id);
        res.status(200).json({
            success: true,
            message: "User Profile updated successfully.",
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
export const userController = {
    getAllUsers,
    updateUserStatusById,
    updateUserProfile
};
