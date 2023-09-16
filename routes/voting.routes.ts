import express from "express";
import * as VotingController from "../controllers/voting.controller";
import errorHandler from "../utils/errorHandler";

const router = express.Router();

router.post("/", errorHandler(VotingController.castVote));
router.post(
	"/search",
	errorHandler(VotingController.getWinnerByConstituencyName)
);
router.post(
	"/constituency",
	errorHandler(VotingController.getWinnerByConstituency)
);
router.get("/all", errorHandler(VotingController.getAllWinnersOfElection));

export default router;
