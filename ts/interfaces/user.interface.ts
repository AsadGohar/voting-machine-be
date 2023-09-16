import { Document, Schema } from 'mongoose';
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  constituency: Schema.Types.ObjectId;
  picture: string;
  isVerified: boolean;
  cnic:string
  comparePassword: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}
export interface ILogin extends Document {
  email: string;
  password: string;
}