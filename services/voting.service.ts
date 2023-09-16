import Voting from "../models/voting.model";
import Election from "../models/election.model";
import Constituency from "../models/constituency.model";
import { Types } from "mongoose";
import User from "../models/user.model";
import Candidate from "../models/candidate.model";
import { IUser } from "../ts/interfaces/user.interface";

export const castVote = async (userId: string, candidateId: string) => {
	const user = await User.findById(userId);
	if (!user) {
		return { code: 404, info: { status: false, message: "User Not Found" } };
	}
	if (user && user.role == "candidate") {
		return {
			code: 409,
			info: { status: false, message: "Candidates Cannot Vote" },
		};
	}
	const candidate = await Candidate.findById(candidateId).populate<{
		user: IUser;
	}>("user");
	if (
		candidate &&
		String(candidate.user.constituency) != String(user.constituency)
	) {
		return {
			code: 409,
			info: { status: false, message: "Candidates Not in Same Constituency" },
		};
	}
	const constituency = await Constituency.findById(user.constituency);
	if (!constituency) {
		return {
			code: 404,
			info: { status: false, message: "Constituency not found" },
		};
	}
	const election = await Election.find({ isActive: true }).lean();
	if (election.length == 0) {
		return {
			code: 404,
			info: { status: false, message: "Election not found" },
		};
	}
	if (election.length > 2) {
		return {
			code: 404,
			info: { status: false, message: "Multiple Elections Running" },
		};
	}
	const currentTime = new Date();
	if (currentTime > election[0].endDate) {
		return {
			code: 400,
			info: { status: false, message: "Voting has ended" },
		};
	}
	if (currentTime < election[0].startDate) {
		return {
			code: 400,
			info: { status: false, message: "Voting has not started yet" },
		};
	}

	const existingVote = await Voting.findOne({
		voter: userId,
		constituency: user.constituency,
		election: election[0].id,
	});
	if (existingVote) {
		return {
			code: 400,
			info: {
				status: false,
				message: "User has already cast a vote in their constituency",
			},
		};
	}

	const voting = await Voting.create({
		voter: userId,
		candidate: candidateId,
		constituency: user.constituency,
		election: election[0].id,
	});
	await voting.save();

	return {
		code: 200,
		info: {
			status: true,
			message: "Your Vote Has Been Casted Successfully",
			voting,
		},
	};
};

export const getWinnerByConstituency = async (
	electionId: string,
	constituencyId: string
) => {
	const election = await Election.findById(electionId);
	if (!election) {
		return {
			code: 404,
			info: { status: false, message: "Election not found" },
		};
	}

	const currentDate = new Date();
	if (currentDate > election.startDate && currentDate < election.endDate) {
		return {
			code: 400,
			info: { status: false, message: "Voting has not concluded" },
		};
	}
	if (currentDate < election.startDate) {
		return {
			code: 400,
			info: { status: false, message: "Voting is Yet to start" },
		};
	}
	const newElectionId = new Types.ObjectId(electionId);
	const newConstituencyId = new Types.ObjectId(constituencyId);

	const winner = await Voting.aggregate([
		{
			$match: { election: newElectionId, constituency: newConstituencyId },
		},
		{
			$group: {
				_id: "$candidate",
				votes: { $sum: 1 },
			},
		},
		{
			$lookup: {
				from: "candidates",
				localField: "_id",
				foreignField: "_id",
				as: "candidate",
			},
		},
		{
			$lookup: {
				from: "users",
				localField: "candidate.user",
				foreignField: "_id",
				as: "candidate.user",
			},
		},
		{
			$sort: { votes: -1 },
		},
		{
			$limit: 1,
		},
	]);

	return {
		code: 200,
		info: {
			status: true,
			message: `Winner is ${winner[0].candidate.user[0].name} `,
			winner: winner[0],
		},
	};
};

export const getWinnerByConstituencyName = async (
	electionId: string,
	constituencyName: string
) => {
	const constituency = await Constituency.findOne({ name: constituencyName });
	if (!constituency) {
		return {
			code: 404,
			info: { status: false, message: "Constituency not found" },
		};
	}

	const election = await Election.findById(electionId);
	if (!election) {
		return {
			code: 404,
			info: { status: false, message: "Election not found" },
		};
	}

	const currentDate = new Date();
	if (currentDate > election.startDate && currentDate < election.endDate) {
		return {
			code: 400,
			info: { status: false, message: "Voting has not concluded" },
		};
	}
	if (currentDate < election.startDate) {
		return {
			code: 400,
			info: { status: false, message: "Voting is Yet to start" },
		};
	}
	const newElectionId = new Types.ObjectId(electionId);
	const newConstituencyId = new Types.ObjectId(constituency._id);

	const winner = await Voting.aggregate([
		{
			$match: { election: newElectionId, constituency: newConstituencyId },
		},
		{
			$group: {
				_id: "$candidate",
				votes: { $sum: 1 },
			},
		},
		{
			$lookup: {
				from: "candidates",
				localField: "_id",
				foreignField: "_id",
				as: "candidate",
			},
		},
		{
			$lookup: {
				from: "users",
				localField: "candidate.user",
				foreignField: "_id",
				as: "candidate.user",
			},
		},
		{
			$lookup: {
				from: "constituencies",
				localField: "_id.constituency",
				foreignField: "_id",
				as: "constituency",
			},
		},
		{
			$project: {
				winner: "$candidate",
				votes: 1,
				constituency: { $arrayElemAt: ["$constituency", 0] },
			},
		},
		{
			$sort: { votes: -1 },
		},
		{
			$limit: 1,
		},
	]);

	return {
		code: 200,
		info: {
			status: true,
			message: `Found Winner`,
			winners: winner,
		},
	};
};

export const getAllWinnersByConstituency = async () => {
	const elections = await Election.find({ isActive: true }).lean();
	if (elections.length > 1) {
		return {
			code: 404,
			info: { status: false, message: "Multiple Elections Running" },
		};
	}
	if (elections.length == 0) {
		return {
			code: 404,
			info: { status: false, message: "No Elections Running" },
		};
	}
	const election = elections[0];

	const currentDate = new Date();
	if (currentDate > election.startDate && currentDate < election.endDate) {
		return {
			code: 400,
			info: { status: false, message: "Voting has not concluded" },
		};
	}
	if (currentDate < election.startDate) {
		return {
			code: 400,
			info: { status: false, message: "Voting is Yet to start" },
		};
	}
	const newElectionId = new Types.ObjectId(election._id);
	const winners = await Voting.aggregate([
		{
			$match: { election: newElectionId },
		},
		{
			$group: {
				_id: { constituency: "$constituency", candidate: "$candidate" },
				votes: { $sum: 1 },
			},
		},
		{
			$lookup: {
				from: "candidates",
				localField: "_id.candidate",
				foreignField: "_id",
				as: "candidate",
			},
		},
		{
			$lookup: {
				from: "users",
				localField: "candidate.user",
				foreignField: "_id",
				as: "candidate.user",
			},
		},
		{
			$lookup: {
				from: "constituencies",
				localField: "_id.constituency",
				foreignField: "_id",
				as: "constituency",
			},
		},
		{
			$sort: { "_id.constituency": 1, votes: -1 },
		},
		{
			$group: {
				_id: "$_id.constituency",
				winner: { $first: "$candidate" },
				totalVotes: { $sum: "$votes" },
				votesToWinner: { $first: "$votes" },
				constituency: { $first: { $arrayElemAt: ["$constituency", 0] } },
			},
		},
	]);

	return {
		code: 200,
		info: {
			status: true,
			message: "Winners Found",
			winners,
			election: elections[0]._id,
		},
	};
};
