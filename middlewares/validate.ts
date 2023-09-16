import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

const validate = (schema: yup.ObjectSchema<any>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validate(req.body, { abortEarly: false });
			next();
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				res.status(400).json({ status: false, mesage: error.errors[0] });
			} else if (error instanceof Error) {
				res.status(400).json({ status: false, mesage: error.message });
			}
			else {
				res.status(400).json({ status: false, mesage: 'validation failed' });
			}
		}
	};
};

export default validate;
