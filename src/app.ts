import express, { Application } from 'express';
import { mealsRouter } from './modules/meals/meals.routes';
import { ordersRouter } from './modules/orders/orders.routes';
import { reviewsRouter } from './modules/reviews/reviews.routes';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import notFound from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';


const app: Application = express();
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
}))

app.use(express.json())
app.all("/api/auth/*splat", toNodeHandler(auth));



app.use("/api/meals", mealsRouter)  
app.use("/api/orders", ordersRouter)  
app.use("/api/reviews", reviewsRouter)  




app.get("/", (req, res) => {
    res.send(`foodHub running at port: ${process.env.PORT}`)
});


app.use(notFound)
app.use(errorHandler)


export default app;
