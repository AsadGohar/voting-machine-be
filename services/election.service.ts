import Election from "../models/election.model";

export const createElection = async (data: any) => {
	const { startDate, name } = data;
	const activeElection = await Election.findOne({ isActive: true });

	if (activeElection) {
		return { code: 409, info: { message: "There is Already An Election" } };
	}

	const startDateConvert = new Date(startDate);
	const day = 60 * 60 * 24 * 1000;

	const endDate = new Date(startDateConvert.getTime() + day);
	const election = await Election.create({
		name,
		startDate: startDateConvert,
		endDate,
	});
	return {
		code: 201,
		info: { status: true, message: "Election Created", election },
	};
};

export const getElectionById = async (id: string) => {
	const election = await Election.findById(id);
	if (!election) {
		return {
			code: 404,
			info: { status: false, message: "Election not found" },
		};
	}
	return { code: 200, info: { election } };
};

export const updateElection = async (data: any) => {
	const { endDate, startDate } = data;
	const elections = await Election.find({
		isActive: true,
	}).lean();
	if (elections.length > 1) {
		return {
			code: 409,
			info: { status: false, message: "Multiple Elections Running" },
		};
	}
	const election = await Election.findOne({
		isActive: true,
	});
	if (election) {
		election.startDate = startDate;
		election.endDate = endDate;
		await election.save();
		return { code: 200, info: { status: true, election } };
	} else {
		return {
			code: 404,
			info: { status: false, mesage: "Election Not Found" },
		};
	}
};

export const deleteElection = async (id: string) => {
	const election = await Election.findByIdAndUpdate(
		id,
		{ isActive: false },
		{ new: true }
	);
	if (!election) {
		return {
			code: 404,
			info: { status: false, message: "Election not found" },
		};
	}
	return {
		code: 200,
		info: { message: "Election soft deleted successfully" },
	};
};

export const getAllElections = async () => {
	const elections = await Election.find().lean();
	return { code: 200, info: { elections } };
};

export const getActiveElection = async () => {
	const elections = await Election.find({ isActive: true }).lean();
	if (elections.length > 1) {
		return {
			code: 409,
			info: { status: false, message: "Multiple Elections Running" },
		};
	}
	if (elections.length == 1) {
		return { code: 200, info: { election: elections[0] } };
	} else {
		return {
			code: 404,
			info: { status: false, message: "Election Not Found" },
		};
	}
};

export const stopAllElections = async () => {
	const elections = await Election.updateMany(
		{ isActive: true },
		{ $set: { isActive: false } }
	);
	if (elections && elections.modifiedCount > 0) {
		return {
			code: 409,
			info: { status: true, message: "All Elections Stopped" },
		};
	} else if (elections && elections.modifiedCount == 0) {
		return {
			code: 404,
			info: { status: false, message: "No Running Elections Found" },
		};
	} else {
		return {
			code: 404,
			info: { status: false, message: "Failed to Stop Elections" },
		};
	}
};
