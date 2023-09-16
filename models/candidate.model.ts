import mongoose, { Schema } from 'mongoose';
import { ICandidate } from '../ts/interfaces/candidate.interface';

const candidateSchema: Schema<ICandidate> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  party_name: {type:String, required:true},
  party_picture:{type:String, required:true},
  isApproved: { type: Boolean, default: false }
});

const Candidate = mongoose.model<ICandidate>('Candidate', candidateSchema);

export default Candidate;
