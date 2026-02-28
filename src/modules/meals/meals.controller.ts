import { Request, Response } from "express";
import { mealService } from "./meals.service";

const createPost = async (req: Request, res: Response) => {
    try {
        const result = await mealService.createMeals(req.body)
        res.status(201).json({
            result
        })
    } catch (error) {
        res.status(400).json
    }
}





export const mealsController = {
    createPost
}