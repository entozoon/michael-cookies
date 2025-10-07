# michael-cookies

Simple, asynchronous interface for browser cookies.

```bash
npm i michael-cookies
```

## Usage

### `setCookie`

Sets a cookie with a key, value, and optional expiry in days.

```javascript
import { setCookie } from "michael-cookies";

// Set a simple cookie
setCookie({ key: "theme", value: "dark" });

// Set a cookie that expires in 7 days
setCookie({ key: "session", value: "user123", expiryDays: 7 });

// Set a cookie with SameSite=None and Secure attributes
setCookie({
  key: "tracking",
  value: "xyz",
  attributes: {
    SameSite: "None",
    Secure: true,
  },
});
```

### `getCookie`

Retrieves a cookie object by its key.

```javascript
import { getCookie } from "michael-cookies";

const themeCookie = getCookie({ key: "theme" });
if (themeCookie) {
  console.log(themeCookie.value); // 'dark'
}
```

### `getCookiesByPrefix`

Retrieves all cookies that have a key starting with a given prefix.

```javascript
import { setCookie, getCookiesByPrefix } from "michael-cookies";

// Set some cookies
setCookie({ key: "user.name", value: "Michael" });
setCookie({ key: "user.preference", value: "cats" });

// Get cookies by prefix
const userCookies = getCookiesByPrefix({ prefix: "user." });
console.log(userCookies);
// [
//   { key: 'user.name', value: 'Michael' },
//   { key: 'user.preference', value: 'cats' }
// ]
```

### `getAllCookies`

Retrieves all cookies.

```javascript
import { getAllCookies } from "michael-cookies";

const allCookies = getAllCookies();
console.log(allCookies);
```

### `deleteCookie`

Deletes a cookie by its key.

```javascript
import { deleteCookie } from "michael-cookies";

// Delete a simple cookie
deleteCookie({ key: "theme" });

// Delete a cookie with attributes
deleteCookie({
  key: "tracking",
  attributes: {
    SameSite: "None",
    Secure: true,
  },
});
```
