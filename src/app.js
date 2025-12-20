import express from "express";
import taskRouter from "./routes/task.route.js";
import authRoute from "./routes/auth.route.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoute);

app.use("/task", taskRouter);

export default app;
