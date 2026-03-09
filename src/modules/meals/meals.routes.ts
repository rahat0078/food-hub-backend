import express, { Router } from "express";
import { mealsController } from "./meals.controller";

const router = express.Router();

router.get("/", mealsController.getAllMeals)
router.get("/:id", mealsController.getMealById)



export const mealsRouter: Router = router