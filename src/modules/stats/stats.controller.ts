import { Request, Response, NextFunction } from "express";
import { statsService } from "./stats.service";


const getPublicStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await statsService.getPublicStats()
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getAdminStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await statsService.getAdminStats()
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}


export const statsController = {
    getPublicStats, getAdminStats
}