import express from "express"
import dotenv from "dotenv";
import healthRouter from "./routes/health";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

//Middleware
app.use(express.json());

//Routes
app.use("/api/health", healthRouter);

//Start server
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
