"use strict";
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
exports.deleteCookie = exports.getCookiesByPrefix = exports.getCookie = exports.getAllCookies = exports.parseCookies = exports.setCookie = void 0;
var setCookie = function (_a) {
    var key = _a.key, value = _a.value, expiryDays = _a.expiryDays;
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
var parseCookies = function (cookieString) {
    var cookies = cookieString.split(";").filter(function (c) { return c; });
    return cookies.map(function (cookie) {
        var _a = __read(cookie.split("=").map(function (c) { return c.trim(); }), 2), key = _a[0], value = _a[1];
        var decodedValue = decodeURI(value);
        return { key: key, value: decodedValue };
    });
};
exports.parseCookies = parseCookies;
var getAllCookies = function () { return (0, exports.parseCookies)(document.cookie); };
exports.getAllCookies = getAllCookies;
var getCookie = function (_a) {
    var key = _a.key, _b = _a.cookies, cookies = _b === void 0 ? (0, exports.getAllCookies)() : _b;
    return cookies.find(function (cookie) { return cookie.key === key; });
};
exports.getCookie = getCookie;
var getCookiesByPrefix = function (_a) {
    var prefix = _a.prefix, _b = _a.cookies, cookies = _b === void 0 ? (0, exports.getAllCookies)() : _b;
    return cookies.filter(function (cookie) { return cookie.key.startsWith(prefix); });
};
exports.getCookiesByPrefix = getCookiesByPrefix;
var deleteCookie = function (_a) {
    var key = _a.key;
    (0, exports.setCookie)({ key: key, value: "", expiryDays: -1 });
};
exports.deleteCookie = deleteCookie;
