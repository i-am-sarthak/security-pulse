import dotenv from "dotenv";
dotenv.config();

import express from "express"
import healthRouter from "./routes/health";
import usersRouter from './routes/users';
import { config } from './config/default';


const app = express();
const PORT = config.port;

//Middleware
app.use(express.json());

//Routes
app.use("/api/health", healthRouter);
app.use('/api/users', usersRouter);

//Start server
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

// Error handler middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
