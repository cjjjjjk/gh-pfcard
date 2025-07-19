"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = getToken;
function getToken(env) {
    return env.GITHUB_PAT || 'get-token-false';
}
