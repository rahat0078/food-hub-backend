import { Request, Response, NextFunction } from "express";
import { mealService } from "./meals.service";


const getAllMeals = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const search = req.query.search as string | undefined;
        const providerId = req.query.providerId as string | undefined;
        const categoryId = req.query.categoryId as string | undefined;

        const sortBy = (req.query.sortBy as string) || "createdAt";
        const sortOrder = (req.query.sortOrder as "asc" | "desc") || "desc";

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const result = await mealService.getAllMeals({ search, providerId, categoryId, page, limit, skip, sortBy, sortOrder });

        res.status(200).json({
            success: true,
            message: "Meals retrieved successfully",
            result
        });
    } catch (error) {
        next(error);
    }
};

const getMealById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const result = await mealService.getMealById(id as string);
        if (result === null) {
            res.status(404).json({
                success: false,
                message: "meal not found",
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "meal retrived successfully",
                data: result
            })
        }
    } catch (error) {
        next(error)
    }
}

const createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id
        const { mealId, rating, comment } = req.body;

        const result = await mealService.createReview(userId as string, { mealId, rating, comment, });

        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};






export const mealsController = {
    getAllMeals, getMealById, createReview
}