import Invite from "../models/invite.model";
import User from "../models/user.model";

export const getAllInvitesByUserId = async (data) => {
	const { user_id } = data;
	const invites = await Invite.find({ user: user_id, status: "pending" }).lean();
	return { code: 200, info: { invites } };
};

export const acceptInvite = async (data: any) => {
	const { id } = data;
	const invite = await Invite.findById(id);
	if (invite) {
		const user = await User.findById(invite.user);
		if (user) {
			user.role = "admin";
			invite.status = "accepted";
			await user.save();
			await invite.save();
			return { code: 200, info: { invite } };
		} else {
			return {
				code: 401,
				info: {
					status: false,
					message: "Failed to accept Invite",
				},
			};
		}
	} else {
		return {
			code: 401,
			info: {
				status: false,
				message: "Failed to find invite",
			},
		};
	}
};
