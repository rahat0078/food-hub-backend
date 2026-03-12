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

/*
const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const userId = req.user.id;

    const result = await orderService.getUserOrders(userId);

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: result
    });

  } catch (error) {
    next(error);
  }
};


const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params;

    const result = await orderService.getOrderById(id);

    res.status(200).json({
      success: true,
      message: "Order details retrieved successfully",
      data: result
    });

  } catch (error) {
    next(error);
  }
};

*/

export const ordersController = {
    createOrder,
}