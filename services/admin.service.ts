import User from "../models/user.model";
import Candidate from "../models/candidate.model";
import Invite from "../models/invite.model";
import * as EmailService from "./email.service";

export const getAllVoters = async () => {
	const voters = await User.find({
		role: "voter",
	}).lean();
	return { code: 200, info: { voters } };
};

export const getUnApprovedCandidates = async () => {
	const candidates = await Candidate.find({
		isApproved: false,
	}).populate("user");
	return { code: 200, info: { candidates } };
};

export const approveCandidate = async (id: string) => {
	const candidate = await Candidate.findById(id);
	if (candidate) {
		if (!candidate.isApproved) {
			const user = await User.findById(candidate.user);
			if (user) {
				user.role = "candidate";
				await user.save();
			}
			candidate.isApproved = true;
			await candidate.save();

			const candidates = await Candidate.find({
				isApproved: false,
			}).lean();
			return {
				code: 200,
				info: { status: true, message: "candidate approved", candidates },
			};
		} else {
			return {
				code: 200,
				info: { status: true, message: "candidate already approved" },
			};
		}
	} else {
		return {
			code: 400,
			info: { status: false, message: "Failed to find candidate" },
		};
	}
};

export const inviteUser = async (data: any) => {
	const { constituency, cnic } = data;
	const user = await User.find({
		constituency,
		cnic,
	}).lean();
	if (user.length > 0) {
		const findInvite = await Invite.find({ user: user[0]._id });
		if (findInvite.length > 0) {
			return {
				code: 401,
				info: {
					status: false,
					message: "User Already invited",
				},
			};
		}
		const invite = await Invite.create({
			user: user[0]._id,
			status: "pending",
		});
		if (invite) {
			EmailService.sendMail(user[0].email);
			return {
				code: 200,
				info: { status: true, message: "Invite Sent" },
			};
		} else {
			return {
				code: 400,
				info: { status: false, message: "Failed to create Invite" },
			};
		}
	} else {
		return {
			code: 400,
			info: { status: false, message: "User Not Found" },
		};
	}
};
