import { Document } from 'mongoose';

export interface Queue extends Document {
  createAt: Date;
  endCreateAt: Date;
}
