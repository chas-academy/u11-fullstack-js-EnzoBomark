import mongoose from 'mongoose';

import { ArticleDocument } from './article.model';
import { UserDocument } from './user.model';

export interface UserSavedArticleDocument extends mongoose.Document {
  user: UserDocument['_id'];
  article: ArticleDocument['_id'];
}

const UserSavedArticleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
});

export const UserSavedArticle = mongoose.model<UserSavedArticleDocument>(
  'UserSavedArticle',
  UserSavedArticleSchema
);
