import express, { Application, Request, Response } from "express";
import cors from "cors"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { medicinesRoutes } from "./src/modules/medicines/medicine.route";
import { orderRoutes } from "./src/modules/orders/order.route";

export const port = process.env.PORT || 5000;
export const app: Application = express();


app.use(cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true,
}));

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());


app.use("/api", medicinesRoutes);
app.use("/api", orderRoutes);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "MediStore server is running" });
});

