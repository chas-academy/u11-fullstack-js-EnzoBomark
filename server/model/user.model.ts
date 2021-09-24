import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  role: string | undefined;
  resetPasswordToken: string | undefined;
  resetPasswordExpire: number | undefined;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  getResetPasswordToken(): string;
  verifyPassword(password: string): boolean;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Number },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  let user = this as UserDocument;

  //only hash the password if it has been modified (or if new);
  if (!user.isModified('password')) {
    return next();
  }

  const saltWorkFactor = (config.get('SALT_WORK_FACTOR') as number) || 10;

  // Get salt facor
  const salt = await bcrypt.genSalt(saltWorkFactor);

  // Hash password with salt factor
  const hash = await bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt
    .compare(candidatePassword, user.password)
    .catch((error) => false);
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  const user = this as UserDocument;

  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

UserSchema.methods.verifyPassword = function (password) {
  const user = this as UserDocument;

  return bcrypt.compareSync(password, user.password);
};

export const User = mongoose.model<UserDocument>('User', UserSchema);
