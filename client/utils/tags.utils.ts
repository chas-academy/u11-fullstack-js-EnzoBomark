export const getTags = (body) => {
  const getAllTextValues = body.map((item) => item.children.map((child) => child.text));
  const concatArrays = getAllTextValues.reduce((flatten, arr) => [...flatten, ...arr]);

  const tagArr = concatArrays.join(' ').match(/#([^\s]*)/g);
  if (!tagArr) return;
  return tagArr.filter((item, index) => index <= 6 && item.length <= 15);
};
