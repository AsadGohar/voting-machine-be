import mongoose, { Schema } from "mongoose";
import { IUser } from "../ts/interfaces/user.interface";
import {
	createToken,
	createRefreshToken,
	comparePassword,
	hashPassword,
} from "../utils/auth";

const userSchema: Schema<IUser> = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	role: {
		type: String,
		enum: ["admin", "candidate", "voter"],
		required: true,
		default: "voter",
	},
	constituency: { type: Schema.Types.ObjectId, ref: "Constituency" },
	picture: { type: String },
	isVerified: { type: Boolean, default: false },
	cnic: {
		type: String,
		required: true,
	},
});

userSchema.pre<IUser>("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await hashPassword(this.password);
	}
	next();
});

userSchema.methods.comparePassword = async function (password: string) {
	return comparePassword(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
	const token = createToken(this._id);
	return token;
};

userSchema.methods.generateRefreshToken = function () {
	return createRefreshToken(this._id);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
