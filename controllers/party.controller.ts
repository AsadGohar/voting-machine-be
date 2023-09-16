import { Request, Response } from "express";
import * as PartyService from "../services/party.service";

export const create = async (
	req: Request,
	res: Response
) => {
	const data = await PartyService.createParty(req.body);
	res.status(data.code).send(data.info);
};

export const getAll = async (
	req: Request,
	res: Response
) => {
	const data = await PartyService.getAllParties();
	res.status(data.code).send(data.info);
};

export const getById = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;
	const data = await PartyService.getPartyById(id);
	res.status(data.code).send(data.info);
};

export const update = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;
	const data = await PartyService.updateParty(id, req.body);
	res.status(data.code).send(data.info);
};

export const remove = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;
	const data = await PartyService.deleteParty(id);
	res.status(data.code).send(data.info);
};
