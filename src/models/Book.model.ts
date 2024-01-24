import { Schema, Document, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import privateValidator from 'mongoose-private';

export interface IBook {
  title: string;
  publisher: string;
  category: string;
  year: string;
  borrowed: boolean;
  author: string;
  borrowedBy: object;
  dueDate: Date;
  is_deleted: boolean;
}

export default interface IBookModel extends Document, IBook {
}

const schema = new Schema<IBookModel>(
  {
    title: { type: String, default: null },
    publisher: { type: String, default: null },
    category: { type: String, default: null },
    year: { type: String, default: null },
    borrowed: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    author: { type: String },
    borrowedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    dueDate: { type: Date, default: null },
  },
  { timestamps: true },
);

// Plugins
schema.plugin(uniqueValidator);
schema.plugin(privateValidator);


export const Book = model<IBookModel>('Book', schema);
