export const setCookie = ({ key, value, expiryDays }) => {
  const expiryDate = new Date(Date.now() + expiryDays * 86400000);
  let cookieString = `${key}=${encodedValue}`;
  if (expiryDays) {
    const expiryString = `;expires=${expiryDate.toUTCString()}`;
    cookieString += expiryString;
  }
  cookieString += ";path=/";
};
export const getCookie = (key) => {
  // https://stackoverflow.com/a/21125098/3098773
  const match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
  // Return undefined, boolean, or string depending on what comes back
  if (!match || typeof match[2] == "undefined") return undefined;
  const value = match[2];
  return value === "true" ? true : value === "false" ? false : decodeURI(value);
};
