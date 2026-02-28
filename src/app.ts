import express, { Application } from 'express';
import { mealsRouter } from './modules/meals/meals.routes';
import { ordersRouter } from './modules/orders/orders.routes';
import { reviewsRouter } from './modules/reviews/reviews.routes';

const app: Application = express();


app.use("/api/meals", mealsRouter)  
app.use("/api/orders", ordersRouter)  
app.use("/api/reviews", reviewsRouter)  




app.get("/", (req, res) => {
    res.send(`foodHub running at port: ${process.env.PORT}`)
});




export default app;
