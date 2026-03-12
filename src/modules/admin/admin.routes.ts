import express, { Router } from "express";
import { UserRole } from "../../enums/userRole";
import auth from "../../middlewares/auth.middleware";
import { amdinController } from "./admin.controller";

const router = express.Router();

router.post("/category", auth(UserRole.ADMIN), amdinController.createCategory)
router.delete("/category/:id", auth(UserRole.ADMIN), amdinController.deleteCategory)
router.get("/users", auth(UserRole.ADMIN), amdinController.getAllUsers)
router.patch("/users/:id", auth(UserRole.ADMIN), amdinController.updateUserStatus)


export const adminRouter: Router = router