export const paginate = async (
  model: any,
  page: number,
  limit: number,
  query: string = ''
) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const regexQuery = new RegExp(query, 'i');

  const res = await model
    .find()
    .or([{ title: { $regex: regexQuery } }, { tags: { $in: [regexQuery] } }]);

  const results: { next?: {}; previous?: {}; data?: {} } = {};

  if (endIndex < res.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.data = res.slice(startIndex, startIndex + limit);

  return results;
};
