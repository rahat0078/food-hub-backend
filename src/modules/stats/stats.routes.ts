import express, { Router } from "express";
import { statsController } from "./stats.controller";
import { UserRole } from "../../enums/userRole";
import auth from './../../middlewares/auth.middleware';

const router = express.Router();

router.get("/", statsController.getPublicStats)
router.get("/admin", auth(UserRole.ADMIN), statsController.getAdminStats)

export const statsRouter: Router = router