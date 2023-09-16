import express from "express";
import * as CandidateController from "../controllers/candidate.controller";
import { auth } from "../middlewares/auth";
import { UserTypes } from "../utils/auth";
import errorHandler from "../utils/errorHandler";

const router = express.Router();

router.post(
	"/",
	auth(UserTypes.voter),
	errorHandler(CandidateController.createCandidate)
);
router.get("/", errorHandler(CandidateController.getAllCandidates));
router.get("/:id", errorHandler(CandidateController.getCandidateById));
router.put("/:id", errorHandler(CandidateController.updateCandidate));
router.delete("/:id", errorHandler(CandidateController.deleteCandidate));

export default router;
