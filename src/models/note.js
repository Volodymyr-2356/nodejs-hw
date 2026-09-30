import { Schema, model } from 'mongoose';

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
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',
      ],
    },
  },
  { timestamps: true },
);

noteSchema.index({ tag: 1 });
export const Note = model('Note', noteSchema);
