import { Document } from "mongoose";
export interface IConstituency extends Document {
	name: string;
	location: string;
}
