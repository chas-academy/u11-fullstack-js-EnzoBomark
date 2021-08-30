import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import { UserDocument } from './user.model';

export interface PostDocument extends mongoose.Document {
  user: UserDocument['_id'];
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, default: true },
    body: { type: String, default: true },
    image: { type: String, default: true },
  },
  { timestamps: true }
);

export const Post = mongoose.model<PostDocument>('Post', PostSchema);
