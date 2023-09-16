import User from "../models/user.model";
import Candidate from "../models/candidate.model";
import {
	ICandidate,
	ICandidateUpdate,
} from "../ts/interfaces/candidate.interface";

export const createCandidate = async (data: any) => {
	const { user_id, party_name, pic_url } = data;
	const user = await User.findById(user_id);
	const prev = await Candidate.find({
		user: user_id,
	}).lean();
	if (prev.length > 0) {
		return {
			code: 409,
			info: {
				status: false,
				message: "Already Requested To Become A Candidate",
			},
		};
	}
	const prev_name = await Candidate.find({
		party_name: party_name,
	}).lean();
	if (prev_name.length > 0) {
		return {
			code: 409,
			info: { status: false, message: "Party Name Already in Use" },
		};
	}
	if (user) {
		const candidate: ICandidate = await Candidate.create({
			user: user_id,
			party_name,
			party_picture: pic_url,
		});
		await user.save();
		await candidate.save();

		return {
			code: 201,
			info: { message: "Candidate created successfully", candidate },
		};
	} else {
		return {
			code: 404,
			info: { status: false, message: "User Not Found" },
		};
	}
};

export const getAllCandidates = async () => {
	const candidates: ICandidate[] = await Candidate.find()
		.populate("user")
		.populate("party");
	return { code: 200, info: { candidates } };
};

export const getCandidateById = async (id: string) => {
	const candidateId: string = id;
	const candidate: ICandidate | null = await Candidate.findById(candidateId)
		.populate("user")
		.populate("party");
	if (candidate) {
		return {
			code: 200,
			info: {
				candidate,
			},
		};
	} else {
		return {
			code: 401,
			info: {
				status: false,
				message: "Candidate not found",
			},
		};
	}
};

export const updateCandidate = async (data: ICandidateUpdate) => {
	const { user, party, isApproved, id } = data;
	const updatedCandidate: ICandidate | null = await Candidate.findByIdAndUpdate(
		id,
		{ user, party, isApproved },
		{ new: true }
	)
		.populate("user")
		.populate("party");
	if (updatedCandidate) {
		return {
			code: 200,
			info: {
				message: "Candidate updated successfully",
				candidate: updatedCandidate,
			},
		};
	} else {
		return {
			code: 401,
			info: {
				status: false,
				message: "Candidate not found",
			},
		};
	}
};

export const deleteCandidate = async (id: string) => {
	const candidateId: string = id;
	const deletedCandidate: ICandidate | null = await Candidate.findByIdAndRemove(
		candidateId
	);
	if (deletedCandidate) {
		return { code: 200, info: { message: "Candidate deleted successfully" } };
	} else {
		return {
			code: 401,
			info: { status: false, message: "Candidate not found" },
		};
	}
};
