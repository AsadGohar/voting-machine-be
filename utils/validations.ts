import * as yup from "yup";
import { Types } from "mongoose";

export const userValidationSchema = yup.object().shape({
	name: yup.string().required("name is required"),
	email: yup.string().email("invalid email").required("email is required"),
	password: yup
		.string()
		.trim()
		.min(8, "password too short")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
			"password isn't strong enough"
		)
		.required("password is required"),
	constituency: yup.string().test({
		name: "valid-id",
		message: "Invalid constituency ID",
		test: (value: string | undefined) => {
			return !value || Types.ObjectId.isValid(value);
		},
	}),
	picture: yup.string().nullable(),
	isVerified: yup.boolean(),
	cnic: yup
		.string()
		.required("identification is required")
		.matches(/^\d{5}-\d{7}-\d{1}$/, "invalid identification"),
});

export const partyValidationSchema = yup.object().shape({
	name: yup.string().required("Name is required"),
	symbol: yup.string().required("Symbol is required"),
});
