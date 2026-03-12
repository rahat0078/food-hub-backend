import express, { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import { UserRole } from "../../enums/userRole";
import { providersController } from "./providers.controller";

const router = express.Router();



router.get("/meals", auth(UserRole.PROVIDER), providersController.getProviderMeals)
router.get("/", providersController.getAllProviders)
router.get("/:id", providersController.getProviderById)
router.post("/meals", auth(UserRole.PROVIDER), providersController.createMeals)
router.put("/meals/:id", auth(UserRole.PROVIDER), providersController.updateMeal);
router.patch("/orders/:id", auth(UserRole.PROVIDER), providersController.updateOrderStatus);
router.delete("/meals/:id", auth(UserRole.PROVIDER), providersController.deleteMeal);


export const providerRouter: Router = router