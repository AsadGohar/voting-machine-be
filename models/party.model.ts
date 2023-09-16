import mongoose, { Schema, Document } from "mongoose";
import { IParty } from "../ts/interfaces/party.interface";

const partySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	symbol: {
		type: String,
		required: true,
	},
});

export const Party = mongoose.model<IParty>("Party", partySchema);
