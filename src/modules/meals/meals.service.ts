import { Meal } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";



const createMeals = async (data: Omit<Meal, "id"| "createdAt" | "updatedAt">) => {
    const result = await prisma.meal.create({
        data
    })
}



export const mealService = {
    createMeals
}