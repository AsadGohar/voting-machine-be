import mongoose, { Schema } from 'mongoose';
import {IElection} from '../ts/interfaces/election.interface'

const electionSchema: Schema<IElection> = new Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  constituencies: [{
    type: Schema.Types.ObjectId,
    ref: 'Constituency',
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Election = mongoose.model<IElection>('Election', electionSchema);

export default Election;
