import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth"
import { UserRole } from "../enums/userRole";

const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers as any,
            });

            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized: session missing",
                });
            }


            if (!session.user.emailVerified) {
                return res.status(403).json({
                    success: false,
                    message: "Verify your email first",
                });
            }

            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role as UserRole,
                emailVerified: session.user.emailVerified,
            };


            if (roles.length && !roles.includes(req.user.role as UserRole)) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized",
                });
            }

            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error);
            next(error);
        }
    };
};


export default auth