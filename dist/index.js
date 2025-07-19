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
const cardHandler_1 = require("./handlers/cardHandler");
exports.default = {
    fetch(request, env) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = new URL(request.url);
            if (url.pathname === '/user') {
                return (0, cardHandler_1.cardHandler)(url, env);
            }
            return new Response('404 Not Found', { status: 404 });
        });
    }
};
