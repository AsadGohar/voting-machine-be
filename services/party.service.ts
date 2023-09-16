import { Party } from "../models/party.model";
import { IParty } from "../ts/interfaces/party.interface";

export const createParty = async (data: IParty) => {
	const { name, symbol } = data;
	const party: IParty = new Party({ name, symbol });
	await party.save();
	return {
		code: 201,
		info: { message: "Party created successfully", party },
	};
};

export const getAllParties = async () => {
	const parties: IParty[] = await Party.find().lean();
	return { code: 200, info: { parties } };
};

export const getPartyById = async (id: string) => {
	const party: IParty | null = await Party.findById(id);
	if (party) {
		return {
			code: 200,
			info: {
				message: "Party found",
				party,
			},
		};
	} else {
		return {
			code: 404,

			info: {
				status: false,
				message: "Party not found",
			},
		};
	}
};

export const updateParty = async (id: string, data: IParty) => {
	const { name, symbol } = data;
	const updatedParty: IParty | null = await Party.findByIdAndUpdate(
		id,
		{
			name,
			symbol,
		},
		{ new: true }
	);
	if (updatedParty) {
		return {
			code: 200,
			info: {
				message: "Party updated successfully",
				party: updatedParty,
			},
		};
	} else {
		return {
			code: 404,
			info: {
				status: false,
				message: "Party not found",
			},
		};
	}
};

export const deleteParty = async (id: string) => {
	const deletedParty: IParty | null = await Party.findByIdAndRemove(id);
	if (deletedParty) {
		return {
			code: 200,
			info: {
				message: "Party deleted successfully",
			},
		};
	} else {
		return {
			code: 404,
			info: {
				status: false,
				message: "Party not found",
			},
		};
	}
};
