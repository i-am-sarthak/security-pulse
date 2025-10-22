import dotenv from "dotenv";
dotenv.config();

import express from "express"
import healthRouter from "./routes/health";
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import articlesRouter from './routes/articles';
import savedArticlesRouter from './routes/savedArticles';
import { verifyToken } from './middleware/verifyToken';
import { config } from './config/default';


const app = express();
const PORT = config.port;

import cors from "cors";
app.use(cors());

//Middleware
app.use(express.json());

//Routes
app.use("/api/health", healthRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/saved', savedArticlesRouter);

app.get('/api/me', verifyToken, (req, res) => {
  res.json({ user: (req as any).user });
});

//Start server
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

// Error handler middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
