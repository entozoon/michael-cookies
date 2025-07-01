export const setCookie = ({
  key,
  value,
  expiryDays,
  document = window.document,
}: {
  key: string;
  value: string;
  expiryDays?: number;
  document?: Document;
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
export const getCookie = ({
  key,
  document = window.document,
}: {
  key: string;
  document?: Document;
}): string | boolean | undefined => {
  // https://stackoverflow.com/a/21125098/3098773
  const match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
  // Return undefined, boolean, or string depending on what comes back
  if (!match || typeof match[2] === "undefined") return undefined;
  const value = match[2];
  return value === "true" ? true : value === "false" ? false : decodeURI(value);
};
export const getCookiesByPrefix = ({
  prefix,
  document = window.document,
}: {
  prefix: string;
  document?: Document;
}): Record<string, string> => {
  const cookies = document.cookie.split(";");
  const result: Record<string, string> = {};
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=").map((c) => c.trim());
    if (key.startsWith(prefix)) {
      const decodedValue = decodeURI(value);
      result[key] = decodedValue;
    }
  }
  return result;
};
