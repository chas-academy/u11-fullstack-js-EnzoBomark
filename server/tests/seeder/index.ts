import fs from 'fs';
import util from 'util';
import path from 'path';
import mongoose from 'mongoose';
import { toTitleCase } from '../../utils/toTitleCase.utils';

const readDir = util.promisify(fs.readdir);

// Load seeds of all models
export const seedDatabase = async (runSaveMiddleware = false) => {
  const dir = await readDir(__dirname);
  const seedFiles = dir.filter((f) => f.endsWith('.seed.ts'));

  for (const file of seedFiles) {
    const fileName = file.split('.')[0];
    const modelName = toTitleCase(fileName);
    const model = mongoose.models[modelName];

    if (!model) throw new Error(`Cannot find Model '${modelName}'`);
    const fileContents = require(path.join(__dirname, file));

    runSaveMiddleware
      ? await model.create(fileContents)
      : await model.insertMany(fileContents);
  }
};
