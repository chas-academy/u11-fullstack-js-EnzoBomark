import { countWords } from './wordCounter.utils';

export const getReadTime = (body) => {
  const getAllTextValues = body.map((item) => item.children.map((child) => child.text));
  const concatArrays = getAllTextValues.reduce((flatten, arr) => [...flatten, ...arr]);
  const wordsPerMinute = countWords(concatArrays.join(' ')) / 200;
  return Math.floor(wordsPerMinute);
};
