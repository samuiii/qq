import * as mongoose from 'mongoose';

export const QueueSchema = new mongoose.Schema({
  createAt: {
    type: Date,
    require: true,
  },
  endCreateAt: {
    type: Date,
    require: true,
  },
});
