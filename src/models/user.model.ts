import { Schema, Document, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import privateValidator from 'mongoose-private';

export interface IUser {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  borrowedBooks: [{}]
  is_deleted: boolean;
}

export default interface IUserModel extends Document, IUser {
  name: string;
}

const schema = new Schema<IUserModel>(
  {
    first_name: { type: String, default: null },
    middle_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, default: null },
    borrowedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Plugins
schema.plugin(uniqueValidator);
schema.plugin(privateValidator);

schema.virtual('name').get(function (this: IUserModel) {
  return `${this.first_name} ${this.middle_name} ${this.last_name}`;
});

export const User = model<IUserModel>('User', schema);
