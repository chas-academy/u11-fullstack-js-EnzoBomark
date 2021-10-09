import mongoose from 'mongoose';

import { ArticleDocument } from './article.model';
import { UserDocument } from './user.model';

export interface ArticleLikesDocument extends mongoose.Document {
  article: ArticleDocument['_id'];
  user: UserDocument['_id'];
}

const ArticleLikesSchema = new mongoose.Schema({
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export const ArticleLikes = mongoose.model<ArticleLikesDocument>(
  'ArticleLikes',
  ArticleLikesSchema
);
