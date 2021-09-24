import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import { UserDocument } from './user.model';

export interface ArticleDocument extends mongoose.Document {
  user: UserDocument['_id'];
  author: UserDocument['name'];
  title: string;
  tags: string[];
  image: string;
  body: object;
  about: string;
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    author: { type: String, default: true },
    title: { type: String, default: true },
    tags: { type: [String], default: true },
    image: { type: String, default: true },
    body: { type: Object, default: true },
    about: { type: String, default: true },
    readTime: { type: Number, default: true },
  },
  { timestamps: true }
);

export const Article = mongoose.model<ArticleDocument>(
  'Article',
  ArticleSchema
);
