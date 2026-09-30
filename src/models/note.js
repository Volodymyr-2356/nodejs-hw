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
  },
  { timestamps: true },
);

noteSchema.index({ tag: 1 });
export const Note = model('Note', noteSchema);
