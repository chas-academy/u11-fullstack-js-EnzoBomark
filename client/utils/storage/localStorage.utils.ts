export const setStorage = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key)) || '';
};

export const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};
