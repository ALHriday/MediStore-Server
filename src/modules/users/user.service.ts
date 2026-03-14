import { prisma } from "../../../lib/prisma";

const getAllUsers = async () => {
    return await prisma.user.findMany();
}

type UpdateStatus = "ACTIVE" | "BAN";

interface updateUserStatus {
    status: UpdateStatus
}

const updateUserStatusById = async (payload: updateUserStatus, userId: string) => {
    const { status } = payload;
    return await prisma.user.update({ where: { id: userId }, data: { status } })
}

interface UserProfile {
    name: string;
    image: string;
    phone: string;
}

const updateUserProfile = async (payload: UserProfile, currentUserId: string) => {
    const { name, image, phone } = payload;
    return await prisma.user.update({ where: { id: currentUserId }, data: { name, image, phone } });
}

export const userService = {
    getAllUsers,
    updateUserStatusById,
    updateUserProfile
}