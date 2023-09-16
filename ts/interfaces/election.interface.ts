import mongoose, { Document } from 'mongoose';
export interface IElection extends Document {
  name: string;
  startDate: Date;
  endDate: Date;
  constituencies: mongoose.Types.ObjectId[];
  isActive: boolean;
}
