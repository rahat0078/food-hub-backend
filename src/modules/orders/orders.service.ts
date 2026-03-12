import { UserRole } from "../../enums/userRole";
import { prisma } from "../../lib/prisma";
import { AppError } from './../../utils/appError';


const createOrder = async (userId: string, payload: any) => {

    const { providerId, address, items, totalPrice } = payload;

    for (const item of items) {
        const meal = await prisma.meal.findUnique({
            where: { id: item.mealId }
        });

        if (!meal) {
            throw new AppError("Meal not found");
        }
    }

    const result = await prisma.order.create({
        data: {
            customerId: userId,
            providerId,
            address,
            totalPrice,
            orderItems: {
                create: items.map((item: any) => ({
                    mealId: item.mealId,
                    quantity: item.quantity
                }))
            }
        },
        include: {
            orderItems: true
        }
    });

    return result;
};


const getUserOrders = async (user: any) => {

    if (user.role === UserRole.USER) {
        return prisma.order.findMany({
            where: { customerId: user.id },
            include: {
                provider: true,
                orderItems: { include: { meal: true } }
            },
            orderBy: { createdAt: "desc" }
        });
    }

    if (user.role === UserRole.PROVIDER) {
        const providerProfile = await prisma.providerProfile.findUnique({
            where: { userId: user.id }
        });

        if (!providerProfile) throw new AppError("Provider profile not found");

        return prisma.order.findMany({
            where: { providerId: providerProfile.id },
            include: {
                user: true,
                orderItems: { include: { meal: true } }
            },
            orderBy: { createdAt: "desc" }
        });
    }
    if (user.role === UserRole.ADMIN) {
        return await prisma.order.findMany({
            include: {
                user: true,
                orderItems: { include: { meal: true } }
            },
            orderBy: { createdAt: "desc" }
        })
    }

    throw new AppError("Role not allowed to view orders");
};

const getOrderById = async (orderId: string, user: any) => {

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      provider: true,           
      user: true,               
      orderItems: { include: { meal: true } }
    }
  });

  if (!order) throw new AppError("Order not found");

  if (user.role === UserRole.USER && order.customerId !== user.id)
    throw new AppError("Not allowed to access this order");

  if (user.role === UserRole.PROVIDER) {
    const providerProfile = await prisma.providerProfile.findUnique({
      where: { userId: user.id }
    });

    if (!providerProfile) throw new AppError("Provider profile not found");

    if (order.providerId !== providerProfile.id)
      throw new AppError("Not allowed to access this order");
  }

  return order;
};

export const orderService = {
    createOrder, getUserOrders, getOrderById
}