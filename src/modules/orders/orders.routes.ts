import express, { Router } from "express";

const router = express.Router();

router.post("/", (req, res) => {
    res.send("create orders success")
})



export const ordersRouter: Router = router