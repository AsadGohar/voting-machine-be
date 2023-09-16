import { Request, Response } from "express";
import * as CandidateService from "../services/candidate.service";

export const createCandidate = async (
	req: Request,
	res: Response
) => {
	const data = await CandidateService.createCandidate(req.body);
	res.status(data.code).send(data.info);
};

export const getAllCandidates = async (
	req: Request,
	res: Response
) => {
	const data = await CandidateService.getAllCandidates();
	res.status(data.code).send(data.info);
};

export const getCandidateById = async (
	req: Request,
	res: Response
) => {
	const data = await CandidateService.getCandidateById(req.params.id);
	res.status(data.code).send(data.info);
};

export const updateCandidate = async (
	req: Request,
	res: Response
) => {
	const data = await CandidateService.updateCandidate({
		...req.body,
		id: req.params.id,
	});
	res.status(data.code).send(data.info);
};

export const deleteCandidate = async (
	req: Request,
	res: Response
) => {
		const data = await CandidateService.deleteCandidate(req.params.id);
		res.status(data.code).send(data.info);
};
