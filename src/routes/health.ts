import {Router, Request, Response} from "express";
import { success } from "../utils/response";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).json(success({ status: "ok" }, "Health check passed"));
});

export default router
