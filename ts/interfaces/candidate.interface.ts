import { Document, Schema } from 'mongoose';
export interface ICandidate extends Document {
  user: Schema.Types.ObjectId;
  party_name: string;
  party_picture: string;
  isApproved: boolean
}
export interface ICandidateUpdate extends Document {
  id:string
  user: Schema.Types.ObjectId;
  party: Schema.Types.ObjectId;
  isApproved: boolean
}