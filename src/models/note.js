import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      trim: true,
      required: true,
      type: String,
    },
    content: {
      trim: true,
      default: '',
      type: String,
    },
    tag: {
      type: String,
      default: 'Todo',
      enum: TAGS,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

noteSchema.index({ userId: 1, tag: 1 });
export const Note = model('Note', noteSchema);
