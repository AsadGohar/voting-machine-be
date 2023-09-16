import { Request, Response } from "express";
import * as InviteService from "../services/invite.service";

export const getInviteByUser = async (
	req: Request,
	res: Response
) => {
	const data = await InviteService.getAllInvitesByUserId(req.body);
	res.status(data.code).send(data.info);
};

export const acceptInvite = async (
	req: Request,
	res: Response
) => {
	const data = await InviteService.acceptInvite(req.body);
	res.status(data.code).send(data.info);
};
