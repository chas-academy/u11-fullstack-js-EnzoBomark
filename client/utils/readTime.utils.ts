import getDecendent from './descendantText.utils';
import countWords from './wordCounter.utils';

const getReadTime = (body) => {
  const concatArrays = getDecendent(body).reduce((flatten, arr) => [...flatten, ...arr]);
  const wordsPerMinute = countWords(concatArrays.join(' ')) / 200;
  return Math.floor(wordsPerMinute);
};

export default getReadTime;
