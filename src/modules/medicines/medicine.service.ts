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
}

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
}


const getMedicines = async () => {
    return await prisma.medicines.findMany();
}
const getMedicineById = async (medicineId: string) => {
    return await prisma.medicines.findMany({ where: { id: medicineId } });
}
const getMedicinesCategories = async () => {
    return await prisma.medicines.findMany({ select: { category: true }, distinct: ['categoryId'], });
}

export const medicinesServices = {
    createMedicine,
    getMedicines,
    getMedicineById,
    getMedicinesCategories
}