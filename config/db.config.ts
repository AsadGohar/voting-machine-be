import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model";
import { getSeedData } from "../utils/seed";

mongoose.Promise = global.Promise;

dotenv.config();
const { DB_NAME, MONGODB_URI } = process.env;
const connectToDatabase = async (): Promise<void> => {
	mongoose
		.connect(`${MONGODB_URI}/${DB_NAME}`)
		.then(async () => {
			console.log("connected to MongoDB!", DB_NAME);
		})
		.catch((err) => {
			console.log("Error connecting to DB...", DB_NAME);
			console.log(err);
		});

	mongoose.connection.once("open", async () => {
		try {
			await User.deleteMany({ role: "admin" });
			const data = await getSeedData();
			const admin = await User.create(data);
			if (admin) {
				console.log("Data seeded successfully");
			}
		} catch (error) {
			console.error("Failed to seed data", error);
		}
	});
};

export { connectToDatabase };
