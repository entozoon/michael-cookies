"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookie = exports.setCookie = void 0;
var setCookie = function (_a) {
    var key = _a.key, value = _a.value, expiryDays = _a.expiryDays;
    var expiryDate = new Date(Date.now() + expiryDays * 86400000);
    var encodedValue = encodeURI(value);
    var cookieString = "".concat(key, "=").concat(encodedValue);
    if (expiryDays) {
        var expiryString = ";expires=".concat(expiryDate.toUTCString());
        cookieString += expiryString;
    }
    cookieString += ";path=/";
    document.cookie = cookieString;
};
exports.setCookie = setCookie;
var getCookie = function (key) {
    var match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
    if (!match || typeof match[2] === "undefined")
        return undefined;
    var value = match[2];
    return value === "true" ? true : value === "false" ? false : decodeURI(value);
};
exports.getCookie = getCookie;
