import cookie from 'cookie';

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

export const setCookie = (key: string, value: string) => {
  document.cookie = `${key}=${value}; path=/`;
};

export const getCookie = (key: string, req = null) => {
  const cookies = parseCookies(req);

  return cookies[key];
};

export const removeCookie = (key: string, path: string, domain: string) => {
  if (getCookie(key)) {
    document.cookie =
      key +
      '=' +
      (path ? ';path=' + path : '') +
      (domain ? ';domain=' + domain : '') +
      ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
};

export const clearCookies = () => {
  document.cookie.split(';').forEach((cookie) => {
    document.cookie = cookie.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  });
};
