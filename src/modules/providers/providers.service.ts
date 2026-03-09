import { Meal } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";



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


export const providersService = {
    createMeals, updateMeal, deleteMeal, getAllProviders, getProviderById
}