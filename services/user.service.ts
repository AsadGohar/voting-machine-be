import { isValidObjectId } from "mongoose";
import User from "../models/user.model";
import Candidate from "../models/candidate.model";
import { IUser, ILogin } from "../ts/interfaces/user.interface";
import { IConstituency } from "../ts/interfaces/constituency.interface";

export const userLogin = async (data: ILogin) => {
	const { email, password } = data;
	const user = await User.findOne({ email });
	if (!user) {
		return {
			code: 404,
			info: {
				status: false,
				message: "User not found",
			},
		};
	}
	const isPasswordMatch = await user!.comparePassword(String(password));
	if (!isPasswordMatch) {
		return {
			code: 404,
			info: { status: false, message: "invalid credentials" },
		};
	}
	const accessToken = user!.generateAccessToken();
	const refreshToken = user!.generateRefreshToken();
	return {
		code: 200,
		info: {
			status: true,
			message: "User found",
			user,
			accessToken,
			refreshToken,
		},
	};
};

export const userSignup = async (data: IUser) => {
	const {
		name,
		email,
		password,
		role,
		constituency,
		picture,
		isVerified,
		cnic,
	} = data;
	const checkEmailUser = await User.findOne({ email });
	const checkCnicUser = await User.findOne({ cnic });
	if (checkCnicUser) {
		return {
			code: 409,
			info: {
				status: false,
				message: "cnic already registered",
			},
		};
	}
	if (!checkEmailUser) {
		const user = await User.create({
			name,
			email,
			password,
			role,
			constituency,
			picture,
			isVerified,
			cnic,
		});
		if (user) {
			const accessToken = user.generateAccessToken();
			const refreshToken = user.generateRefreshToken();
			return {
				code: 200,
				info: {
					status: true,
					user,
					accessToken,
					refreshToken,
					message: "Created new user",
				},
			};
		} else {
			return {
				code: 401,
				info: {
					status: false,
					message: "Failed to create new user",
				},
			};
		}
	} else {
		return {
			code: 409,
			info: {
				status: false,
				message: "Email already in use",
			},
		};
	}
};

export const getUsers = async () => {
	const users = await User.find().lean();
	if (users.length > 0) {
		return {
			code: 200,
			info: {
				status: true,
				data: users,
				message: "Found All Users",
			},
		};
	} else {
		return {
			code: 401,
			info: {
				status: false,
				message: "The requested collection does not exist or is empty.",
			},
		};
	}
};

export const getUserById = async (id: string) => {
	if (!isValidObjectId(id))
		return {
			code: 400,
			info: {
				status: false,
				message: "Invalid Object Id",
			},
		};
	const user = await User.findById(id);
	if (user) {
		return {
			code: 200,
			info: {
				status: true,
				data: user,
				message: "Found user",
			},
		};
	} else {
		return {
			code: 401,
			info: {
				status: false,
				message: "User Not Found",
			},
		};
	}
};

export const getVotingCandidatesForUser = async (userId: string) => {
	const user = await User.findById(userId).populate<{
		constituency: IConstituency;
	}>("constituency");
	if (!user) {
		return { code: 404, info: { status: false, message: "User not found" } };
	}
	const candidates = await Candidate.find({ isApproved: true }).populate({
		path: "user",
		match: {
			constituency: user.constituency._id,
			role: "candidate",
		},
	});

	const filteredCandidates = candidates.filter(
		(candidate) => candidate.user !== null
	);
	return { code: 200, info: { candidates: filteredCandidates } };
};

export const uploadProfilePic = async (picture: any, id: string) => {
	const user = await User.findById(id);
	if (user) {
		if (String(picture).length > 0) {
			user.picture = String(picture);
			await user.save();
			return {
				code: 200,
				info: {
					status: true,
					user: user,
					message: "Pic uploaded successfully",
				},
			};
		} else {
			return {
				code: 400,
				info: {
					status: false,
					message: "Pic uploaded failed",
				},
			};
		}
	} else {
		return {
			code: 401,
			info: {
				status: false,
				message: "User Not Found",
			},
		};
	}
};
