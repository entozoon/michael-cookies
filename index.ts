export interface Cookie {
  key: string;
  value: string;
}

const hasSameSiteNoneSupport = () => {
  const userAgent = navigator.userAgent;
  // Safari on iOS 12 and macOS 10.14 are known to have issues.
  if (
    /iP(ad|hone|od).+Version\/12\.\d+.*Safari/.test(userAgent) ||
    /Macintosh.+Version\/12\.\d+.*Safari/.test(userAgent)
  ) {
    return false;
  }
  // Chrome 51-66
  if (/Chrom(e|ium)\/(5[1-6]|6[0-6])/.test(userAgent)) {
    return false;
  }
  return true;
};

export const setCookie = ({
  key,
  value,
  expiryDays,
  attributes,
}: {
  key: string;
  value: string;
  expiryDays?: number;
  attributes?: { [key: string]: string | boolean };
}): void => {
  const encodedValue = encodeURI(value);
  let cookieString = `${key}=${encodedValue}`;
  if (expiryDays) {
    const expiryDate = new Date(Date.now() + expiryDays * 86400000);
    const expiryString = `;expires=${expiryDate.toUTCString()}`;
    cookieString += expiryString;
  }
  cookieString += ";path=/";
  if (attributes) {
    for (let [attrKey, attrValue] of Object.entries(attributes)) {
      if (attrKey.toLowerCase() === "samesite" && attrValue === "None") {
        if (!hasSameSiteNoneSupport()) {
          continue; // Skip SameSite=None for incompatible browsers
        }
        // Ensure Secure is set with SameSite=None
        if (!attributes.Secure) {
          cookieString += ";Secure";
        }
      }
      cookieString += `;${attrKey}`;
      if (attrValue !== true) {
        cookieString += `=${attrValue}`;
      }
    }
  }
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
export const deleteCookie = ({
  key,
  attributes,
}: {
  key: string;
  attributes?: { [key: string]: string | boolean };
}): void => {
  setCookie({ key, value: "", expiryDays: -1, attributes });
};
