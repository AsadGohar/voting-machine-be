import { Request, Response } from "express";
import * as ConstituencyService from "../services/constituency.service";

export const create = async (
	req: Request,
	res: Response
) => {
	const data = await ConstituencyService.createConstituency(req.body);
	res.status(data.code).send(data.info);
};

export const getAll = async (
	req: Request,
	res: Response
) => {
	const data = await ConstituencyService.getAllConstituencies();
	res.status(data.code).send(data.info);
};

export const getById = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;
	const data = await ConstituencyService.getConstituencyById(id);
	res.status(data.code).send(data.info);
};

export const remove = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;
	const data = await ConstituencyService.deleteConstituency(id);
	res.status(data.code).send(data.info);
};
