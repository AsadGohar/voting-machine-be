import { Request, Response, NextFunction } from "express";

const errorHandler =
	(cb: (...args) => void) =>
	async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		Promise.resolve(cb(req, res, next)).catch(next);
	};

export default errorHandler;
