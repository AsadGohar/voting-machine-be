import mongoose, { Document, Schema } from "mongoose";

interface IInvite extends Document {
	user: mongoose.Types.ObjectId;
	status: string;
}

const InviteSchema: Schema<IInvite> = new Schema({
	user: {
		type: Schema.Types.ObjectId,
	},
	status: {
		type: String,
		enum: ["accepted", "pending"],
	},
});

const Invite = mongoose.model<IInvite>("Invite", InviteSchema);

export default Invite;
