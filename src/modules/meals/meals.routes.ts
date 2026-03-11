import express, { Router } from "express";
import { mealsController } from "./meals.controller";
import auth from "../../middlewares/auth.middleware";
import { UserRole } from "../../enums/userRole";

const router = express.Router();

router.get("/", mealsController.getAllMeals)
router.get("/:id", mealsController.getMealById)
router.post("/reviews", auth(), mealsController.createReview)



export const mealsRouter: Router = router