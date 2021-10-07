import { getDecendent } from './descendantText.utils';

export const getTags = (body) => {
  const concatArrays = getDecendent(body).reduce((flatten, arr) => [...flatten, ...arr]);
  const tagArr = concatArrays.join(' ').match(/#([^\s]*)/g);
  if (!tagArr) return;
  return tagArr.filter((item, index) => index <= 6 && item.length <= 15);
};
