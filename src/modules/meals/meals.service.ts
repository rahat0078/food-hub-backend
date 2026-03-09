import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllMeals = async ({
    search,
    providerId,
    categoryId,
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
}: {
    search: string | undefined
    providerId: string | undefined
    categoryId: string | undefined
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
}) => {

    const andCondition: Prisma.MealWhereInput[] = [];

    if (search) {
        andCondition.push({
            OR: [
                {
                    title: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }

    if (providerId) {
        andCondition.push({ providerId });
    }

    if (categoryId) {
        andCondition.push({ categoryId });
    }

    const whereCondition =
        andCondition.length > 0 ? { AND: andCondition } : {};

    const sortableFields = ["price", "createdAt"];

    const orderField = sortableFields.includes(sortBy)
        ? sortBy
        : "createdAt";

    const result = await prisma.meal.findMany({
        take: limit,
        skip,
        where: whereCondition,
        orderBy: {
            [orderField]: sortOrder,
        },
        include: {
            provider: true,
            category: true,
        },
    });

    const totalData = await prisma.meal.count({
        where: whereCondition,
    });

    return {
        data: result,
        pagination: {
            total: totalData,
            page,
            limit,
            totalPage: Math.ceil(totalData / limit),
        },
    };
};


const getMealById = async (id: string) => {

    const result= await prisma.meal.findUnique({
        where: {id},
        include: {
            provider: true,
            reviews: true, 
            category: true
        }
    })

    return result;
 
}


export const mealService = {
    getAllMeals, getMealById
}