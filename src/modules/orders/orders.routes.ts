import express, { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import { ordersController } from "./orders.controller";

const router = express.Router();

router.post("/", auth(), ordersController.createOrder);
// router.get("/", authMiddleware, orderController.getUserOrders);
// router.get("/:id", authMiddleware, orderController.getOrderById);



export const ordersRouter: Router = router