import express, { Router } from "express";

const router = express.Router();

router.post("/", (req, res) => {
    res.send("create reviews success")
})



export const reviewsRouter: Router = router