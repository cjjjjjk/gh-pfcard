"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitHUbFlower = void 0;
const getToken_1 = require("../utils/getToken");
const gitHubAPI = "https://api.github.com/users/";
const getGitHUbFlower = function (username, env) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (0, getToken_1.getToken)(env);
            const response = yield fetch(`${gitHubAPI}${username}/followers`, {
                method: 'GET',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Cloudflare-Worker-GitHub-Proxy'
                }
            });
            const data = yield response.json();
            const followerList = data.map((follower) => {
                return {
                    login: follower.login,
                    avatar_url: follower.avatar_url
                };
            });
            return {
                isSucces: true,
                followerList: followerList
            };
        }
        catch (err) {
            return {
                isSucceed: false,
                followerList: [],
                errorMessage: err.message
            };
        }
    });
};
exports.getGitHUbFlower = getGitHUbFlower;
