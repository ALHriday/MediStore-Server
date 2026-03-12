import { prisma } from "../../../lib/prisma";

const getAllUsers = async () => {
    return await prisma.user.findMany();
}

type UpdateStatus = "ACTIVE" | "BAN";

interface updateUserStatus {
    status: UpdateStatus
}

const updateUserById = async (payload: updateUserStatus, userId: string) => {
    const { status } = payload;
    return await prisma.user.update({ where: { id: userId }, data: { status } })
}


export const userService = {
    getAllUsers,
    updateUserById
}