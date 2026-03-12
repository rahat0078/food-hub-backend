import { prisma } from "../../lib/prisma";


const createOrder = async (userId: string, payload: any) => {

    const { providerId, address, items, totalPrice } = payload;

    for (const item of items) {
        const meal = await prisma.meal.findUnique({
            where: { id: item.mealId }
        });
        
        if (!meal) {
            throw new Error("Meal not found");
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

export const orderService = {
    createOrder
}