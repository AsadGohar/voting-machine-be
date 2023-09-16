import {  Document } from 'mongoose';
export interface IParty extends Document {
  name: string;
  symbol: string;
}