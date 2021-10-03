import { object } from 'yup/lib/locale';

export const paginate = async (model: any, page: number, regex: any) => {
  const limit = 25;
  const startIndex = (page - 1) * limit;

  const res = await model.find().or(regex).skip(startIndex).limit(limit).populate('user', 'name');

  const objectsFound = await model.find().or(regex).skip(startIndex).countDocuments();

  const results = {
    data: res,
    objectsFound,
  };

  return results;
};
