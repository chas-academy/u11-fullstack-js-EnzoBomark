import { object } from 'yup/lib/locale';

export const paginate = async (
  model: any,
  page: number,
  query: string = ''
) => {
  const limit = 1;
  const startIndex = (page - 1) * limit;
  const regexQuery = new RegExp(query, 'i');

  const res = await model
    .find()
    .or([{ title: { $regex: regexQuery } }, { tags: { $in: [regexQuery] } }])
    .skip(startIndex)
    .limit(limit);

  const objectsFound = await model
    .find()
    .or([{ title: { $regex: regexQuery } }, { tags: { $in: [regexQuery] } }])
    .skip(startIndex)
    .countDocuments();

  const results = {
    data: res,
    objectsFound,
  };

  return results;
};
