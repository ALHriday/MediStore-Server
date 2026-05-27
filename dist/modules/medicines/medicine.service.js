// import { uploadImage } from "../../lib/cloudinary.js";
import { prisma } from "../../lib/prisma.js";
import { UserRole } from "../../middlewares/auth.js";
;
// Seller
// const createMedicine = async (payload: medicineModel, currentUserId: string, file: any) => {
const createMedicine = async (payload, currentUserId) => {
    if (!payload) {
        throw new Error("Payload is required!");
    }
    const { title, price, stock, manufacturer, description, categoryId } = payload;
    // if (!file) {
    //     throw new Error("No file");
    // }
    // const imageURL = await uploadImage(file);
    const imageURL = "https://img.icons8.com/?size=100&id=undefined&format=png&color=000000";
    const medicine = await prisma.medicines.create({
        data: {
            title,
            image: String(imageURL),
            stock: Number(stock),
            price: Number(price),
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
const updateMedicine = async (addStock, medicineId, currentUserId) => {
    if (!addStock) {
        throw new Error("Can't Update Stock less than 1!");
    }
    return await prisma.medicines.update({
        where: { id: medicineId, userId: currentUserId },
        data: { stock: addStock }
    });
};
const deleteMedicine = async (medicineId, currentUserId) => {
    return await prisma.medicines.delete({ where: { id: medicineId, userId: currentUserId } });
};
const getStats = async (userId, userRole) => {
    if (userRole === UserRole.ADMIN) {
        const [totalUsers, totalMedicines, totalOrders, totalRevenue] = await Promise.all([
            prisma.user.count(),
            prisma.medicines.count(),
            prisma.orders.count(),
            prisma.orders.aggregate({ _sum: { totalAmount: true } }),
        ]);
        return { totalUsers, totalMedicines, totalOrders, totalRevenue: totalRevenue?._sum?.totalAmount || 0 };
    }
    if (userRole === UserRole.SELLER) {
        const [totalMedicines, totalOrders, totalRevenue] = await Promise.all([
            prisma.medicines.count({ where: { userId: userId } }),
            prisma.orderItems.count({ where: { sellerId: userId } }),
            prisma.orderItems.aggregate({ _sum: { subTotal: true }, where: { sellerId: userId } }),
        ]);
        return { totalMedicines, totalOrders, totalRevenue: totalRevenue._sum.subTotal || 0 };
    }
};
const getMedicinesLen = async () => {
    const totalMedicines = await prisma.medicines.count();
    return { totalMedicines };
};
// All Users
const getMedicines = async (search, m, sort, categoryId, skip) => {
    const where = {};
    if (search) {
        where.title = {
            contains: search,
            mode: 'insensitive',
        };
    }
    if (m) {
        where.manufacturer = {
            contains: m,
            mode: 'insensitive',
        };
    }
    if (categoryId) {
        where.categoryId = String(categoryId);
    }
    return await prisma.medicines.findMany({
        where,
        skip: skip ? skip * 10 : 0,
        take: 10,
        orderBy: { price: sort === 'asc' ? 'asc' : 'desc' },
    });
};
const getMedicineById = async (medicineId) => {
    return await prisma.medicines.findUnique({ where: { id: medicineId } });
};
const getMedicinesCategories = async () => {
    return await prisma.medicines.findMany({ select: { category: true }, distinct: ['categoryId'], });
};
const getAllCategory = async () => {
    return await prisma.categories.findMany();
};
const getMedicineByUser = async (userId) => {
    return await prisma.medicines.findMany({ where: { userId: userId } });
};
export const medicinesServices = {
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
