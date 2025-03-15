"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const url = __importStar(require("node:url"));
function sendHttpGetJson(urlString, headers = {}) {
    return new Promise((resolve, reject) => {
        try {
            const parsedUrl = url.parse(urlString);
            const options = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
                path: parsedUrl.path,
                method: '',
                headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
            };
            const protocol = parsedUrl.protocol === 'https:' ? require('node:https') : require('node:http');
            const req = protocol.request(options, (res) => {
                let responseData = '';
                res.on('data', (chunk) => {
                    responseData += chunk;
                });
                res.on('end', () => {
                    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(responseData);
                    }
                    else {
                        reject({
                            statusCode: res.statusCode || 0,
                            headers: res.headers,
                            body: responseData,
                        });
                    }
                });
            });
            req.on('error', (error) => {
                reject(error);
            });
            req.end();
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.default = sendHttpGetJson;
//# sourceMappingURL=sendGetHttpreq.js.map