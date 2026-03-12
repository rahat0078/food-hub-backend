import { Request, Response, NextFunction } from "express";
import { adminServices } from './admin.service';
import { UserStatus } from "../../enums/userStatus";


const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = req.body.name;

        const result = await adminServices.createCategory(name);
        res.status(201).json({
            success: true,
            message: "New category added",
            data: result
        })
    } catch (error) {
        next(error)
    }
}


const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const result = await adminServices.deleteCategory(id as string);
        res.status(200).json({
            success: true,
            message: "Category deleted",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await adminServices.getAllUsers();
        res.status(200).json({
            success: true,
            message: "All User fetched",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const status: UserStatus = req.body.status;

        const result = await adminServices.updateUserStatus(id as string, status);

        res.status(200).json({
            success: true,
            message: "User status updated successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


export const amdinController = {
    createCategory, deleteCategory, getAllUsers, updateUserStatus
}