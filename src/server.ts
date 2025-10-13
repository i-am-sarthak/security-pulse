import express from "express"
import dotenv from "dotenv";
import healthRouter from "./routes/health";
import usersRouter from './routes/users';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

//Middleware
app.use(express.json());

//Routes
app.use("/api/health", healthRouter);
app.use('/api/users', usersRouter);

//Start server
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
