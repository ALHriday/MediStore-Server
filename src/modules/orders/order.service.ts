import { prisma } from "../../../lib/prisma"

export interface Orders {
    userId: string
    shipping_Address: string
    totalAmount: number
}

const createOrder = async (payload: Orders, currentUserId: string) => {
    const { shipping_Address, totalAmount } = payload;
    return await prisma.orders.create({
        data: {
            shipping_Address,
            totalAmount,
            user: { connect: { id: currentUserId } }
        }
    })
}
const getAllOrders = async (currentUserId: string) => {
    return await prisma.orders.findMany({ where: { userId: currentUserId } })
}
const getOrderById = async (orderId: string) => {
    return await prisma.orders.findUnique({ where: { id: orderId } })
}

type OrderStatus = "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

interface Status {
    status: OrderStatus;
}

const updateOrderStatusById = async (orderId: string, payload: Status) => {
    const { status } = payload;
    return await prisma.orders.update({ where: { id: orderId }, data: { status } });
};

export const orderService = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatusById,
}