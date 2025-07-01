export interface Cookie {
  key: string;
  value: string;
}
export const setCookie = ({
  key,
  value,
  expiryDays,
}: {
  key: string;
  value: string;
  expiryDays?: number;
}): void => {
  const encodedValue = encodeURI(value);
  let cookieString = `${key}=${encodedValue}`;
  if (expiryDays) {
    const expiryDate = new Date(Date.now() + expiryDays * 86400000);
    const expiryString = `;expires=${expiryDate.toUTCString()}`;
    cookieString += expiryString;
  }
  cookieString += ";path=/";
  document.cookie = cookieString;
};
export const parseCookies = (cookieString: string): Cookie[] => {
  const cookies = cookieString.split(";").filter((c) => c);
  return cookies.map((cookie) => {
    const [key, value] = cookie.split("=").map((c) => c.trim());
    const decodedValue = decodeURI(value);
    return { key, value: decodedValue };
  });
};
export const getAllCookies = (): Cookie[] => parseCookies(document.cookie);
export const getCookie = ({
  key,
  cookies = getAllCookies(),
}: {
  key: string;
  cookies?: Cookie[];
}): Cookie | undefined => {
  return cookies.find((cookie) => cookie.key === key);
};
export const getCookiesByPrefix = ({
  prefix,
  cookies = getAllCookies(),
}: {
  prefix: string;
  cookies?: Cookie[];
}): Cookie[] => {
  return cookies.filter((cookie) => cookie.key.startsWith(prefix));
};
export const deleteCookie = ({ key }: { key: string }): void => {
  setCookie({ key, value: "", expiryDays: -1 });
};
