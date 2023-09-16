import mongoose, { Schema } from "mongoose";
import { IVoting } from "../ts/interfaces/voting.interface";

const votingSchema: Schema<IVoting> = new Schema({
	voter: { type: Schema.Types.ObjectId, ref: "User", required: true },
	candidate: { type: Schema.Types.ObjectId, ref: "Candidate", required: true },
	constituency: {
		type: Schema.Types.ObjectId,
		ref: "Constituency",
		required: true,
	},
	election: {
		type: Schema.Types.ObjectId,
		ref: "Election",
		required: true,
	},
});

const Voting = mongoose.model<IVoting>("Voting", votingSchema);

export default Voting;
