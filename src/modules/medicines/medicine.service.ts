import { prisma } from "../../../lib/prisma";
import { UserRole } from "../../middlewares/auth";

export interface medicineModel {
    title: string
    image?: string
    price: number
    stock: number
    manufacturer: string
    description: string
    categoryId: string
};
// Seller
const createMedicine = async (payload: medicineModel, currentUserId: string) => {
    const { title, image, price, stock, manufacturer, description, categoryId } = payload;
    const medicine = await prisma.medicines.create({
        data: {
            title,
            image,
            stock,
            price,
            manufacturer,
            description,
            user: {
                connect: { id: currentUserId }
            },
            category: {
                connect: { id: categoryId }
            },
        }
    });

    return medicine;
};

const updateMedicine = async (addStock: number, medicineId: string, currentUserId: string) => {
    if (!addStock) {
        throw new Error("Can't Update Stock less than 1!");
    }
    return await prisma.medicines.update({
        where: { id: medicineId, userId: currentUserId },
        data: { stock: addStock }
    });
};

const deleteMedicine = async (medicineId: string, currentUserId: string) => {
    return await prisma.medicines.delete({ where: { id: medicineId, userId: currentUserId } });
};

// All Users
const getMedicines = async () => {
    return await prisma.medicines.findMany();
};
const getMedicineById = async (medicineId: string) => {
    return await prisma.medicines.findUnique({ where: { id: medicineId } });
};
const getMedicinesCategories = async () => {
    return await prisma.medicines.findMany({ select: { category: true }, distinct: ['categoryId'], });
};

export const medicinesServices = {
    createMedicine,
    updateMedicine,
    deleteMedicine,
    getMedicines,
    getMedicineById,
    getMedicinesCategories
};