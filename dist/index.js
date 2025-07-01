"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookiesByPrefix = exports.getCookie = exports.setCookie = void 0;
var setCookie = function (_a) {
    var key = _a.key, value = _a.value, expiryDays = _a.expiryDays, _b = _a.document, document = _b === void 0 ? window.document : _b;
    var encodedValue = encodeURI(value);
    var cookieString = "".concat(key, "=").concat(encodedValue);
    if (expiryDays) {
        var expiryDate = new Date(Date.now() + expiryDays * 86400000);
        var expiryString = ";expires=".concat(expiryDate.toUTCString());
        cookieString += expiryString;
    }
    cookieString += ";path=/";
    document.cookie = cookieString;
};
exports.setCookie = setCookie;
var getCookie = function (_a) {
    var key = _a.key, _b = _a.document, document = _b === void 0 ? window.document : _b;
    var match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
    if (!match || typeof match[2] === "undefined")
        return undefined;
    var value = match[2];
    return value === "true" ? true : value === "false" ? false : decodeURI(value);
};
exports.getCookie = getCookie;
var getCookiesByPrefix = function (_a) {
    var e_1, _b;
    var prefix = _a.prefix, _c = _a.document, document = _c === void 0 ? window.document : _c;
    var cookies = document.cookie.split(";");
    var result = {};
    try {
        for (var cookies_1 = __values(cookies), cookies_1_1 = cookies_1.next(); !cookies_1_1.done; cookies_1_1 = cookies_1.next()) {
            var cookie = cookies_1_1.value;
            var _d = __read(cookie.split("=").map(function (c) { return c.trim(); }), 2), key = _d[0], value = _d[1];
            if (key.startsWith(prefix)) {
                var decodedValue = decodeURI(value);
                result[key] = decodedValue;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (cookies_1_1 && !cookies_1_1.done && (_b = cookies_1.return)) _b.call(cookies_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
};
exports.getCookiesByPrefix = getCookiesByPrefix;
