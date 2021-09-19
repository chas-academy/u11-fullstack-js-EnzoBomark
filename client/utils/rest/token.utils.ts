export const getBearerToken = () => {
  return `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken || ''}`;
};

export const getRefreshToken = () => {
  return JSON.parse(localStorage.getItem('user'))?.refreshToken || '';
};
