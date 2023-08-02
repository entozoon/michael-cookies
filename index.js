export const getCookie = (key) => {
  // https://stackoverflow.com/a/21125098/3098773
  var match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
  // Return undefined, boolean, or string depending on what comes back
  if (!match || typeof match[2] == "undefined") return undefined;
  const value = match[2];
  return value === "true" ? true : value === "false" ? false : decodeURI(value);
};
export const setCookie = ({ key, value, expiryDays }) => {
  let expiryDate = new Date(Date.now() + expiryDays * 86400000);
  value =
    encodeURI(value) +
    (expiryDays == null ? "" : "; expires=" + expiryDate.toUTCString());
  document.cookie = key + "=" + value;
};
