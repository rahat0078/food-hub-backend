import express, { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import { UserRole } from "../../enums/userRole";
import { providersController } from "./providers.controller";

const router = express.Router();

router.get("/", providersController.getAllProviders)
router.get("/:id", providersController.getProviderById)
router.post("/meals", auth(UserRole.PROVIDER), providersController.createMeals)
router.put("/meals/:id", auth(UserRole.PROVIDER), providersController.updateMeal);
router.delete("/meals/:id", auth(UserRole.PROVIDER), providersController.deleteMeal);
//TODO: router.get --> get provider own meal

export const providerRouter: Router = router