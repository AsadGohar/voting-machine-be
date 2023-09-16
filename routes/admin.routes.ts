import express from "express";
import * as AdminController from "../controllers/admin.controller";
import { auth } from "../middlewares/auth";
import { UserTypes } from "../utils/auth";
import errorHandler from "../utils/errorHandler";

const router = express.Router();

router.get("/voters", auth(UserTypes.admin), errorHandler(AdminController.getVoters));
router.get("/requests", auth(UserTypes.admin), errorHandler(AdminController.getRequests));
router.post("/approve", auth(UserTypes.admin), errorHandler(AdminController.approve));
router.post("/invite", auth(UserTypes.admin), errorHandler(AdminController.invite));

export default router;
