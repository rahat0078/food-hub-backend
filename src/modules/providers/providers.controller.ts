import { Request, Response, NextFunction } from "express";
import { providersService } from "./providers.service";
import { prisma } from "../../lib/prisma";

const createMeals = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const emailVerified = req.user?.emailVerified as boolean;
        if (emailVerified !== true) {
            return res.status(403).json({
                success: false,
                message: "Verify your email first",
            });
        }

        const result = await providersService.createMeals(req.body)
        res.status(201).json({
            success: true,
            message: "Meal added successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}


const updateMeal = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const mealId = req.params.id as string;
        const meal = await prisma.meal.findUnique({
            where: { id: mealId },
            select: { providerId: true },
        });
        if (!meal) return res.status(404).json({ message: "Meal not found" });

        const provider = await prisma.providerProfile.findUnique({
            where: { id: meal.providerId },
            select: { userId: true },
        });
        const id = req.user?.id;
        if (provider?.userId !== id) {
            return res.status(403).json({ message: "Access denied" });
        }

        const result = await providersService.updateMeal(mealId as string, req.body)

        res.status(200).json({
            success: true,
            message: "Meal updated successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


const deleteMeal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mealId = req.params.id as string;
        const meal = await prisma.meal.findUnique({
            where: { id: mealId },
            select: { providerId: true },
        });
        if (!meal) return res.status(404).json({ message: "Meal not found" });

        const provider = await prisma.providerProfile.findUnique({
            where: { id: meal.providerId },
            select: { userId: true },
        });
        const id = req.user?.id;
        if (provider?.userId !== id) {
            return res.status(403).json({ message: "Access denied" });
        }

        const result = await providersService.deleteMeal(mealId as string)

        res.status(200).json({
            success: true,
            message: "Meal deleted successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};

//TODO: PATCH	/api/provider/orders/:id	Update order status

const getAllProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await providersService.getAllProviders();

        res.status(200).json({
            success: true,
            message: "Providers retrive successfully",
            data: result
        });

    } catch (error) {
        next(error)
    }
}


const getProviderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const result = await providersService.getProviderById(id as string);

        if (result === null) {
            res.status(404).json({
                success: false,
                message: "provider not found"
            });
        } else {
            res.status(200).json({
                success: true,
                data: result
            });
        }

    } catch (error) {
        next(error)
    }
}




export const providersController = {
    createMeals, updateMeal, deleteMeal, getAllProviders, getProviderById
}