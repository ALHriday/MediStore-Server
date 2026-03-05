import express, { Request, Response } from "express";
import cors from "cors"

export const port = process.env.PORT || 5000;
export const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.BETTER_AUTH_URL,
    credentials: true
}));


app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "MediStore server is running" });
});


