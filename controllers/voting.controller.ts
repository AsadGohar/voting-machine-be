import { Request, Response } from "express";
import * as VotingService from "../services/voting.service";

export const castVote = async (req: Request, res: Response) => {
	const { userId, candidateId } = req.body;
	const result = await VotingService.castVote(userId, candidateId);
	res.status(result.code).json(result.info);
};

export const getWinnerByConstituency = async (req: Request, res: Response) => {
	const { electionId, constituencyId } = req.body;
	const result = await VotingService.getWinnerByConstituency(
		electionId,
		constituencyId
	);
	res.status(result.code).json(result.info);
};

export const getWinnerByConstituencyName = async (
	req: Request,
	res: Response
) => {
	const { electionId, constituencyName } = req.body;
	const result = await VotingService.getWinnerByConstituencyName(
		electionId,
		constituencyName
	);
	res.status(result.code).json(result.info);
};

export const getAllWinnersOfElection = async (req: Request, res: Response) => {
	const result = await VotingService.getAllWinnersByConstituency();
	res.status(result.code).json(result.info);
};
