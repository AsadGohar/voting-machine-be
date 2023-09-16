import Constituency from "../models/constituency.model";
import { IConstituency } from "../ts/interfaces/constituency.interface";

export const createConstituency = async (data: IConstituency) => {
	const { name, location } = data;
	const findCon = await Constituency.find({ name }).lean();
	if (findCon.length > 0) {
		return {
			code: 401,
			info: { status: false, message: "Name Already in Use" },
		};
	}
	const constituency: IConstituency = await Constituency.create({
		name,
		location,
	});
	await constituency.save();
	return {
		code: 201,
		info: {
			status: true,
			message: "Constituency created successfully",
			constituency,
		},
	};
};

export const getAllConstituencies = async () => {
	const constituencies: IConstituency[] = await Constituency.find().lean();
	return {
		code: 200,
		info: {
			status: true,
			message: "Found all constituencies",
			constituencies,
		},
	};
};

export const getConstituencyById = async (id: string) => {
	const constituency: IConstituency | null = await Constituency.findById(id);
	if (constituency) {
		return {
			code: 200,
			info: {
				status: true,
				message: "Constituency found",
				constituency,
			},
		};
	} else {
		return {
			code: 404,
			info: {
				status: false,
				message: "Constituency not found",
			},
		};
	}
};

export const deleteConstituency = async (id: string) => {
	const deletedConstituency: IConstituency | null =
		await Constituency.findByIdAndRemove(id);
	if (deletedConstituency) {
		return {
			code: 200,
			info: {
				status: true,
				message: "Constituency deleted successfully",
			},
		};
	} else {
		return {
			code: 404,
			info: {
				status: false,
				message: "Constituency not found",
			},
		};
	}
};
