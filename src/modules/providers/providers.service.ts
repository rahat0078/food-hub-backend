import { Meal } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { AppError } from './../../utils/appError';
import { OrderStatus } from './../../../generated/prisma/enums';



const createMeals = async (data: Omit<Meal, "id" | "createdAt" | "updatedAt">) => {
    const result = await prisma.meal.create({
        data
    })
    return result
}


const updateMeal = async (id: string, payload: any) => {
    const result = await prisma.meal.update({
        where: {
            id
        },
        data: payload
    });

    return result;
};


const deleteMeal = async (id: string) => {
    const result = await prisma.meal.delete({
        where: {
            id
        }
    });

    return result;
};


const updateOrderStatus = async (id: string, userId: string, status: OrderStatus) => {
    

    const providerProfile = await prisma.providerProfile.findUnique({
        where: { userId }
    });
    if (!providerProfile) throw new AppError("Provider profile not found", 404);

    const order = await prisma.order.findUnique({
        where: { id }
    });
    
    if (!order) throw new AppError("Order not found", 404);

    if (order.providerId !== providerProfile.id)
        throw new AppError("Not allowed to update this order", 403);

    const updatedOrder = await prisma.order.update({
        where: { id },
        data: { status },
        include: {
            user: true,
            provider: true,
            orderItems: { include: { meal: true } }
        }
    });

    return updatedOrder;
};


const getAllProviders = async () => {
    const result = await prisma.providerProfile.findMany();
    return result;
};

const getProviderById = async (id: string) => {
    const result = await prisma.providerProfile.findUnique({
        where: { id },
        include: {
            meals: true,
            _count: {
                select: {
                    meals: true
                }
            }
        }
    });

    return result;
};

const getProviderMeals = async (userId: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId }
    });

    if (!provider) {
        throw new AppError("Provider profile not found");
    }

    const meals = await prisma.meal.findMany({
        where: {
            providerId: provider.id
        },
        include: {
            category: true,
            _count: {
                select: {
                    reviews: true
                }
            }
        }
    });

    const soldData = await prisma.orderItem.groupBy({
        by: ["mealId"],
        _sum: {
            quantity: true
        }
    });

    const soldMap: Record<string, number> = {};

    soldData.forEach(item => {
        soldMap[item.mealId] = item._sum.quantity ?? 0;
    });

    const result = meals.map(meal => ({
        ...meal,
        totalSold: soldMap[meal.id] || 0
    }));

    return result;
};


export const providersService = {
    createMeals, updateMeal, deleteMeal, getAllProviders, getProviderById, getProviderMeals, updateOrderStatus
}