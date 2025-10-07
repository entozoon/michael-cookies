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
exports.deleteCookie = exports.getCookiesByPrefix = exports.getCookie = exports.getAllCookies = exports.parseCookies = exports.setCookie = void 0;
var setCookie = function (_a) {
    var e_1, _b;
    var key = _a.key, value = _a.value, expiryDays = _a.expiryDays, attributes = _a.attributes;
    var encodedValue = encodeURI(value);
    var cookieString = "".concat(key, "=").concat(encodedValue);
    if (expiryDays) {
        var expiryDate = new Date(Date.now() + expiryDays * 86400000);
        var expiryString = ";expires=".concat(expiryDate.toUTCString());
        cookieString += expiryString;
    }
    cookieString += ";path=/";
    if (attributes) {
        try {
            for (var _c = __values(Object.entries(attributes)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), attrKey = _e[0], attrValue = _e[1];
                cookieString += ";".concat(attrKey);
                if (attrValue !== true) {
                    cookieString += "=".concat(attrValue);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
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
    var key = _a.key, attributes = _a.attributes;
    (0, exports.setCookie)({ key: key, value: "", expiryDays: -1, attributes: attributes });
};
exports.deleteCookie = deleteCookie;
