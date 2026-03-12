import { Request, Response, NextFunction } from "express";
import { orderService } from './orders.service';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.user?.id;
        const result = await orderService.createOrder(userId as string, req.body);

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        const orders = await orderService.getUserOrders(user);

        res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = req.user; // auth middleware থেকে

        const order = await orderService.getOrderById(id as string, user);

        res.status(200).json({
            success: true,
            message: "Order details retrieved successfully",
            data: order
        });
    } catch (error) {
        next(error);
    }
};


export const ordersController = {
    createOrder, getUserOrders, getOrderById
}