// import { uploadImage } from "../../lib/cloudinary.js";
import { prisma } from "../../lib/prisma.js";
const getAllUsers = async () => {
    return await prisma.user.findMany();
};
const updateUserStatusById = async (payload, userId) => {
    const { status } = payload;
    return await prisma.user.update({ where: { id: userId }, data: { status } });
};
// const updateUserProfile = async (payload: UserProfile, currentUserId: string, filePath: any) => {
const updateUserProfile = async (payload, currentUserId) => {
    const { name, phone } = payload;
    try {
        // if (!filePath) {
        //     throw new Error("No file");
        // }
        // const imageURL = await uploadImage(filePath);
        const imageURL = "https://img.icons8.com/?size=100&id=108296&format=png&color=000000";
        await prisma.user.update({ where: { id: currentUserId }, data: { name, image: String(imageURL), phone } });
        return { name, image: String(imageURL), phone };
    }
    catch (err) {
        return err;
    }
};
export const userService = {
    getAllUsers,
    updateUserStatusById,
    updateUserProfile
};
