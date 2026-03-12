import { prisma } from "../../lib/prisma";

export const getPublicStats = async () => {
    const totalMeals = await prisma.meal.count();
    const totalProviders = await prisma.providerProfile.count();
    const totalOrders = await prisma.order.count();
    const totalReviews = await prisma.review.count();

    return {
        totalMeals,
        totalProviders,
        totalOrders,
        totalReviews
    };
};


const getAdminStats = async () => {
    const totalUsers = await prisma.user.count();
    const totalProviders = await prisma.providerProfile.count();
    const totalMeals = await prisma.meal.count();
    const totalOrders = await prisma.order.count();
    const ordersByStatus = await prisma.order.groupBy({
        by: ["status"],
        _count: { status: true }
    });
    const revenueData = await prisma.order.aggregate({
        _sum: { totalPrice: true }
    });
    return {
        totalUsers,
        totalProviders,
        totalMeals,
        totalOrders,
        ordersByStatus,
        totalRevenue: revenueData._sum.totalPrice ?? 0
    };
};

export const statsService = {
    getPublicStats, getAdminStats
}