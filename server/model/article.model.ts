import mongoose from 'mongoose';
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
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    author: { type: String, ref: 'User' },
    title: { type: String, default: true },
    tags: { type: [String], default: true },
    image: { type: String, default: true },
    body: { type: Object, default: true },
    about: { type: String, default: true },
    readTime: { type: Number, default: true },
  },
  { timestamps: true }
);

export const Article = mongoose.model<ArticleDocument>('Article', ArticleSchema);
