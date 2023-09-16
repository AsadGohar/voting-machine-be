import express from "express";
import * as InviteController from "../controllers/invite.controller";
import errorHandler from "../utils/errorHandler";

const router = express.Router();

router.post("/user", errorHandler(InviteController.getInviteByUser));
router.post("/accept", errorHandler(InviteController.acceptInvite));

export default router;
