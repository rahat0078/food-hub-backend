import express, { Application } from 'express';
import { mealsRouter } from './modules/meals/meals.routes';
import { ordersRouter } from './modules/orders/orders.routes';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import notFound from './middlewares/notFound';
import cors from 'cors';
import { providerRouter } from './modules/providers/providers.routes';
import errorHandler from './middlewares/errorHandler';


const app: Application = express();
app.use(cors({
    origin: process.env.APP_URL, // client site url
    credentials: true
}))

app.use(express.json())
app.all("/api/auth/*splat", toNodeHandler(auth));



app.use("/api/providers", providerRouter)
app.use("/api/meals", mealsRouter)
app.use("/api/orders", ordersRouter)




app.get("/", (req, res) => {
    res.send(`foodHub running at port: ${process.env.PORT}`)
});


app.use(notFound)
app.use(errorHandler)


export default app;
