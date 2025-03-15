"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCookie = parseCookie;
function parseCookie(cookieString) {
    if (!cookieString) {
        return {};
    }
    return cookieString.split(';').reduce((cookies, cookiePair) => {
        const [name, value] = cookiePair.trim().split('=');
        if (name && value) {
            cookies[decodeURIComponent(name.trim())] = decodeURIComponent(value.trim());
        }
        return cookies;
    }, {});
}
//# sourceMappingURL=utils.js.map