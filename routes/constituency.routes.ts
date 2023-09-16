import express from "express";
import * as ConstituencyController from "../controllers/constituency.controller";
import errorHandler from "../utils/errorHandler";

const router = express.Router();

router.get("/", errorHandler(ConstituencyController.getAll));
router.get("/:id", errorHandler(ConstituencyController.getById));
router.post("/", errorHandler(ConstituencyController.create));
router.delete("/:id", errorHandler(ConstituencyController.remove));

export default router;
