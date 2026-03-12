import express, { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import { ordersController } from "./orders.controller";

const router = express.Router();

router.post("/", auth(), ordersController.createOrder);
router.get("/", auth(), ordersController.getUserOrders);
router.get("/:id", auth(), ordersController.getOrderById);



export const ordersRouter: Router = router