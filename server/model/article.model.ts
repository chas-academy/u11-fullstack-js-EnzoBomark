import mongooseFuzzySearching from 'mongoose-fuzzy-searching';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import { UserDocument } from './user.model';

export interface ArticleDocument extends mongoose.Document {
  user: UserDocument['_id'];
  author: UserDocument['name'];
  title: string;
  image: string;
  readTime: string;
  published: string;
  body: object;
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
    title: { type: String, default: true },
    image: { type: String, default: true },
    body: { type: Object, default: true },
  },
  { timestamps: true }
);

ArticleSchema.plugin(mongooseFuzzySearching, {
  fields: ['title', 'author', 'readTime', 'published'],
});

export const Article = mongoose.model<ArticleDocument>(
  'Article',
  ArticleSchema
);
