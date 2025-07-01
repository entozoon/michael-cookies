# michael-cookies

Simple interface for browser cookies.

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
```

### `getCookie`

Retrieves a cookie value by its key.

```javascript
import { getCookie } from "michael-cookies";

const theme = getCookie("theme");
console.log(theme); // 'dark'
```

### `getCookiesByPrefix`

Retrieves all cookies that have a key starting with a given prefix.

```javascript
import { setCookie, getCookiesByPrefix } from "michael-cookies";

// Set some cookies
setCookie({ key: "user.name", value: "Michael" });
setCookie({ key: "user.preference", value: "cats" });

const userCookies = getCookiesByPrefix("user.");
console.log(userCookies); // { 'user.name': 'Michael', 'user.preference': 'cats' }
```
