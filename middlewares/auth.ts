import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import { IUser } from "ts/interfaces/user.interface";

interface AuthenticatedRequest extends Request {
	user?: IUser | null;
}
export const auth = (role: string) => {
	return async (
		req: AuthenticatedRequest,
		res: Response,
		next: NextFunction
	) => {
		try {
			if (req.headers && req.headers.authorization) {
				const token = req.headers.authorization.split(" ")[1];
				if (!token) {
					return res
						.status(401)
						.json({ status: false, message: "Token not found" });
				}

				const decoded: any = jwt.verify(token, String(process.env.JWT_SECRET));
				req.user = await UserModel.findById(decoded.userId);
				console.log(req.user, 'user')
				if (!req.user) {
					return res
						.status(401)
						.json({ status: false, message: "Unauthorized" });
				}

				if (req.user.role !== role) {
					return res
						.status(403)
						.json({ status: false, message: "Unauthorized" });
				}

				next();
			}
			else {
				return res
						.status(401)
						.json({ status: false, message: "Token not Included" });
			}
		} catch (error) {
			console.log(error, "err");
			return res
				.status(500)
				.json({ status: false, message: "Internal server error" });
		}
	};
};
