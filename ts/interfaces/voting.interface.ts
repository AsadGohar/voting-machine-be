import { Document, Schema } from "mongoose";
export interface IVoting extends Document {
	voter: Schema.Types.ObjectId;
	candidate: Schema.Types.ObjectId;
	constituency: Schema.Types.ObjectId;
	election: Schema.Types.ObjectId;
}
