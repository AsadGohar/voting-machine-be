import express from "express";
import * as ElectionController from "../controllers/election.controller";
import { auth } from "../middlewares/auth";
import { UserTypes } from "../utils/auth";
import errorHandler from "../utils/errorHandler";

const router = express.Router();

router.post(
	"/",
	auth(UserTypes.admin),
	errorHandler(ElectionController.createElection)
);
router.get("/", errorHandler(ElectionController.getAllElections));
router.get("/active", errorHandler(ElectionController.getActiveElection));
router.get(
	"/stop",
	auth(UserTypes.admin),
	errorHandler(ElectionController.stopActiveElections)
);
router.get("/:id", errorHandler(ElectionController.getElectionById));
router.put(
	"/",
	auth(UserTypes.admin),
	errorHandler(ElectionController.updateElection)
);
router.delete("/:id", errorHandler(ElectionController.deleteElection));

export default router;
