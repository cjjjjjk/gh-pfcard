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
exports.cardHandler = cardHandler;
const ghAPI_1 = require("../services/ghAPI");
const svgService_1 = require("../services/svgService");
function cardHandler(url, env) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = url.searchParams.get('username') || 'cjjjjjk';
        const followerList = yield (0, ghAPI_1.getGitHUbFlower)(username, env);
        const svg = (0, svgService_1.generateSvg)(username, followerList.followerList);
        return new Response(svg, {
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'no-cache'
            }
        });
    });
}
