import { Request, Response} from "express";
import * as ElectionService from "../services/election.service";

export const createElection = async (
	req: Request,
	res: Response
) => {
	const data = await ElectionService.createElection(req.body);
	res.status(data.code).json(data.info);
};

export const getElectionById = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;
	const data = await ElectionService.getElectionById(id);
	res.status(data.code).json(data.info);
};

export const updateElection = async (
	req: Request,
	res: Response
) => {
	const data = await ElectionService.updateElection(req.body);
	res.status(data.code).json(data.info);
};

export const deleteElection = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;
	const data = await ElectionService.deleteElection(id);
	res.status(data.code).json(data.info);
};

export const getAllElections = async (
	req: Request,
	res: Response
) => {
	const data = await ElectionService.getAllElections();
	res.status(data.code).json(data.info);
};

export const getActiveElection = async (
	req: Request,
	res: Response
) => {
	const data = await ElectionService.getActiveElection();
	res.status(data.code).json(data.info);
};

export const stopActiveElections = async (
	req: Request,
	res: Response
) => {
	const data = await ElectionService.stopAllElections();
	res.status(data.code).json(data.info);
};
