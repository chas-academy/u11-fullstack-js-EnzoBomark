export const getBearerToken = () => {
  return `Bearer ${JSON.parse(localStorage.getItem('accessToken')) || ''}`;
};

export const getRefreshToken = () => {
  return JSON.parse(localStorage.getItem('refreshToen')) || '';
};
