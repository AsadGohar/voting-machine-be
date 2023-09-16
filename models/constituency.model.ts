import mongoose, { Document, Schema } from 'mongoose';
interface IConstituency extends Document {
  name:string
  location: string;
}

const constituencySchema: Schema<IConstituency> = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Constituency = mongoose.model<IConstituency>('Constituency', constituencySchema);

export default Constituency;
