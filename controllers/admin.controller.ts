import { Request, Response } from "express";
import * as AdminService from "../services/admin.service";

export const getVoters = async (
	req: Request,
	res: Response
) => {
	const data = await AdminService.getAllVoters();
	res.status(data.code).send(data.info);
};

export const getRequests = async (
	req: Request,
	res: Response
) => {
	const data = await AdminService.getUnApprovedCandidates();
	res.status(data.code).send(data.info);
};

export const approve = async (
	req: Request,
	res: Response
) => {
	const data = await AdminService.approveCandidate(req.body.id);
	res.status(data.code).send(data.info);
};

export const invite = async (
	req: Request,
	res: Response
) => {
	const data = await AdminService.inviteUser(req.body);
	res.status(data.code).send(data.info);
};
