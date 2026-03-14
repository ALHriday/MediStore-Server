import { title } from "node:process";
import { prisma } from "../../../lib/prisma"
import { number } from "better-auth";

export interface Orders {
    name: string;
    phone: string;
    shippingAddress: string;
    cashOnDelivery: boolean;
    orderItems: OrderItemsData[];
}

export interface OrderItemsData {
    orderId: string;
    medicineId: string;
    quantity: number;
    price: number;
}

// Order Items should be added while creating order.
// Items => Items Array

const createOrder = async (payload: Orders, currentUserId?: string) => {
    const { orderItems, name, phone, cashOnDelivery, shippingAddress } = payload;

    try {

        if (!orderItems || orderItems.length === 0) {
            throw new Error('Your Cart is Empty!')
        }
        const medicineIds = orderItems.map((i: any) => i.medicineId);

        const medicines = await prisma.medicines.findMany({ where: { id: { in: medicineIds } } })

        let totalPrice: number = 0;

        const orderItemsData = orderItems.map((item: OrderItemsData) => {
            const medicine = medicines.find((m) => m.id === item.medicineId);

            if (!medicine) {
                throw new Error("Medicine not found!")
            };

            const subTotal: number = medicine.price * item.quantity;
            totalPrice += subTotal;

            return {
                medicineId: medicine.id,
                title: medicine.title,
                price: medicine.price,
                quantity: item.quantity,
            }
        })

        return await prisma.orders.create({
            data: {
                name,
                phone,
                shippingAddress,
                totalAmount: totalPrice,
                cashOnDelivery,
                orderItems: { create: orderItemsData },
                ...(currentUserId && { user: { connect: { id: currentUserId } } })
            },
            include: { orderItems: true }
        });
    } catch (err: any) {
        console.log(err);
    }
}
// Get all orders placed by current user.
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