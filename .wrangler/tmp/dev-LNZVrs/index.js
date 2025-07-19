"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // C:/Users/LENOVO/AppData/Roaming/nvm/v20.19.0/node_modules/wrangler/templates/middleware/common.ts
  function __facade_register__(...args) {
    __facade_middleware__.push(...args.flat());
  }
  function __facade_registerInternal__(...args) {
    __facade_middleware__.unshift(...args.flat());
  }
  function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
    const [head, ...tail] = middlewareChain;
    const middlewareCtx = {
      dispatch,
      next(newRequest, newEnv) {
        return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
      }
    };
    return head(request, env, ctx, middlewareCtx);
  }
  function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
    return __facade_invokeChain__(request, env, ctx, dispatch, [
      ...__facade_middleware__,
      finalMiddleware
    ]);
  }
  var __facade_middleware__;
  var init_common = __esm({
    "C:/Users/LENOVO/AppData/Roaming/nvm/v20.19.0/node_modules/wrangler/templates/middleware/common.ts"() {
      init_middleware_insertion_facade();
      __facade_middleware__ = [];
      __name(__facade_register__, "__facade_register__");
      __name(__facade_registerInternal__, "__facade_registerInternal__");
      __name(__facade_invokeChain__, "__facade_invokeChain__");
      __name(__facade_invoke__, "__facade_invoke__");
    }
  });

  // C:/Users/LENOVO/AppData/Roaming/nvm/v20.19.0/node_modules/wrangler/templates/middleware/loader-sw.ts
  function __facade_isSpecialEvent__(type) {
    return type === "fetch" || type === "scheduled";
  }
  var __FACADE_EVENT_TARGET__, __facade__originalAddEventListener__, __facade__originalRemoveEventListener__, __facade__originalDispatchEvent__, __facade_waitUntil__, __facade_response__, __facade_dispatched__, __Facade_ExtendableEvent__, __Facade_FetchEvent__, __Facade_ScheduledEvent__;
  var init_loader_sw = __esm({
    "C:/Users/LENOVO/AppData/Roaming/nvm/v20.19.0/node_modules/wrangler/templates/middleware/loader-sw.ts"() {
      init_middleware_insertion_facade();
      init_common();
      if (globalThis.MINIFLARE) {
        __FACADE_EVENT_TARGET__ = new (Object.getPrototypeOf(WorkerGlobalScope))();
      } else {
        __FACADE_EVENT_TARGET__ = new EventTarget();
      }
      __name(__facade_isSpecialEvent__, "__facade_isSpecialEvent__");
      __facade__originalAddEventListener__ = globalThis.addEventListener;
      __facade__originalRemoveEventListener__ = globalThis.removeEventListener;
      __facade__originalDispatchEvent__ = globalThis.dispatchEvent;
      globalThis.addEventListener = function(type, listener, options) {
        if (__facade_isSpecialEvent__(type)) {
          __FACADE_EVENT_TARGET__.addEventListener(
            type,
            listener,
            options
          );
        } else {
          __facade__originalAddEventListener__(type, listener, options);
        }
      };
      globalThis.removeEventListener = function(type, listener, options) {
        if (__facade_isSpecialEvent__(type)) {
          __FACADE_EVENT_TARGET__.removeEventListener(
            type,
            listener,
            options
          );
        } else {
          __facade__originalRemoveEventListener__(type, listener, options);
        }
      };
      globalThis.dispatchEvent = function(event) {
        if (__facade_isSpecialEvent__(event.type)) {
          return __FACADE_EVENT_TARGET__.dispatchEvent(event);
        } else {
          return __facade__originalDispatchEvent__(event);
        }
      };
      globalThis.addMiddleware = __facade_register__;
      globalThis.addMiddlewareInternal = __facade_registerInternal__;
      __facade_waitUntil__ = Symbol("__facade_waitUntil__");
      __facade_response__ = Symbol("__facade_response__");
      __facade_dispatched__ = Symbol("__facade_dispatched__");
      __Facade_ExtendableEvent__ = class ___Facade_ExtendableEvent__ extends Event {
        static {
          __name(this, "__Facade_ExtendableEvent__");
        }
        [__facade_waitUntil__] = [];
        waitUntil(promise) {
          if (!(this instanceof ___Facade_ExtendableEvent__)) {
            throw new TypeError("Illegal invocation");
          }
          this[__facade_waitUntil__].push(promise);
        }
      };
      __Facade_FetchEvent__ = class ___Facade_FetchEvent__ extends __Facade_ExtendableEvent__ {
        static {
          __name(this, "__Facade_FetchEvent__");
        }
        #request;
        #passThroughOnException;
        [__facade_response__];
        [__facade_dispatched__] = false;
        constructor(type, init) {
          super(type);
          this.#request = init.request;
          this.#passThroughOnException = init.passThroughOnException;
        }
        get request() {
          return this.#request;
        }
        respondWith(response) {
          if (!(this instanceof ___Facade_FetchEvent__)) {
            throw new TypeError("Illegal invocation");
          }
          if (this[__facade_response__] !== void 0) {
            throw new DOMException(
              "FetchEvent.respondWith() has already been called; it can only be called once.",
              "InvalidStateError"
            );
          }
          if (this[__facade_dispatched__]) {
            throw new DOMException(
              "Too late to call FetchEvent.respondWith(). It must be called synchronously in the event handler.",
              "InvalidStateError"
            );
          }
          this.stopImmediatePropagation();
          this[__facade_response__] = response;
        }
        passThroughOnException() {
          if (!(this instanceof ___Facade_FetchEvent__)) {
            throw new TypeError("Illegal invocation");
          }
          this.#passThroughOnException();
        }
      };
      __Facade_ScheduledEvent__ = class ___Facade_ScheduledEvent__ extends __Facade_ExtendableEvent__ {
        static {
          __name(this, "__Facade_ScheduledEvent__");
        }
        #scheduledTime;
        #cron;
        #noRetry;
        constructor(type, init) {
          super(type);
          this.#scheduledTime = init.scheduledTime;
          this.#cron = init.cron;
          this.#noRetry = init.noRetry;
        }
        get scheduledTime() {
          return this.#scheduledTime;
        }
        get cron() {
          return this.#cron;
        }
        noRetry() {
          if (!(this instanceof ___Facade_ScheduledEvent__)) {
            throw new TypeError("Illegal invocation");
          }
          this.#noRetry();
        }
      };
      __facade__originalAddEventListener__("fetch", (event) => {
        const ctx = {
          waitUntil: event.waitUntil.bind(event),
          passThroughOnException: event.passThroughOnException.bind(event)
        };
        const __facade_sw_dispatch__ = /* @__PURE__ */ __name(function(type, init) {
          if (type === "scheduled") {
            const facadeEvent = new __Facade_ScheduledEvent__("scheduled", {
              scheduledTime: Date.now(),
              cron: init.cron ?? "",
              noRetry() {
              }
            });
            __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
            event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
          }
        }, "__facade_sw_dispatch__");
        const __facade_sw_fetch__ = /* @__PURE__ */ __name(function(request, _env, ctx2) {
          const facadeEvent = new __Facade_FetchEvent__("fetch", {
            request,
            passThroughOnException: ctx2.passThroughOnException
          });
          __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
          facadeEvent[__facade_dispatched__] = true;
          event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
          const response = facadeEvent[__facade_response__];
          if (response === void 0) {
            throw new Error("No response!");
          }
          return response;
        }, "__facade_sw_fetch__");
        event.respondWith(
          __facade_invoke__(
            event.request,
            globalThis,
            ctx,
            __facade_sw_dispatch__,
            __facade_sw_fetch__
          )
        );
      });
      __facade__originalAddEventListener__("scheduled", (event) => {
        const facadeEvent = new __Facade_ScheduledEvent__("scheduled", {
          scheduledTime: event.scheduledTime,
          cron: event.cron,
          noRetry: event.noRetry.bind(event)
        });
        __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
        event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
      });
    }
  });

  // C:/Users/LENOVO/AppData/Roaming/nvm/v20.19.0/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
  var drainBody, middleware_ensure_req_body_drained_default;
  var init_middleware_ensure_req_body_drained = __esm({
    "C:/Users/LENOVO/AppData/Roaming/nvm/v20.19.0/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts"() {
      init_middleware_insertion_facade();
      drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
        try {
          return await middlewareCtx.next(request, env);
        } finally {
          try {
            if (request.body !== null && !request.bodyUsed) {
              const reader = request.body.getReader();
              while (!(await reader.read()).done) {
              }
            }
          } catch (e) {
            console.error("Failed to drain the unused request body.", e);
          }
        }
      }, "drainBody");
      middleware_ensure_req_body_drained_default = drainBody;
    }
  });

  // C:/Users/LENOVO/AppData/Roaming/nvm/v20.19.0/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
  function reduceError(e) {
    return {
      name: e?.name,
      message: e?.message ?? String(e),
      stack: e?.stack,
      cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
    };
  }
  var jsonError, middleware_miniflare3_json_error_default;
  var init_middleware_miniflare3_json_error = __esm({
    "C:/Users/LENOVO/AppData/Roaming/nvm/v20.19.0/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts"() {
      init_middleware_insertion_facade();
      __name(reduceError, "reduceError");
      jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
        try {
          return await middlewareCtx.next(request, env);
        } catch (e) {
          const error = reduceError(e);
          return Response.json(error, {
            status: 500,
            headers: { "MF-Experimental-Error-Stack": "true" }
          });
        }
      }, "jsonError");
      middleware_miniflare3_json_error_default = jsonError;
    }
  });

  // .wrangler/tmp/bundle-enXdRt/middleware-insertion-facade.js
  var init_middleware_insertion_facade = __esm({
    ".wrangler/tmp/bundle-enXdRt/middleware-insertion-facade.js"() {
      "use strict";
      init_loader_sw();
      init_middleware_ensure_req_body_drained();
      init_middleware_miniflare3_json_error();
      __facade_registerInternal__([middleware_ensure_req_body_drained_default, middleware_miniflare3_json_error_default]);
    }
  });

  // dist/utils/getToken.js
  var require_getToken = __commonJS({
    "dist/utils/getToken.js"(exports) {
      "use strict";
      init_middleware_insertion_facade();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getToken = getToken;
      function getToken(env) {
        return env.GITHUB_PAT || "get-token-false";
      }
      __name(getToken, "getToken");
    }
  });

  // dist/services/ghAPI.js
  var require_ghAPI = __commonJS({
    "dist/services/ghAPI.js"(exports) {
      "use strict";
      init_middleware_insertion_facade();
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        __name(adopt, "adopt");
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          __name(fulfilled, "fulfilled");
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          __name(rejected, "rejected");
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          __name(step, "step");
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getGitHUbFlower = void 0;
      var getToken_1 = require_getToken();
      var gitHubAPI = "https://api.github.com/users/";
      var getGitHUbFlower = /* @__PURE__ */ __name(function(username, env) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const token = (0, getToken_1.getToken)(env);
            const response = yield fetch(`${gitHubAPI}${username}/followers`, {
              method: "GET",
              headers: {
                "Authorization": `token ${token}`,
                "Accept": "application/vnd.github.v3+json",
                "User-Agent": "Cloudflare-Worker-GitHub-Proxy"
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
              followerList
            };
          } catch (err) {
            return {
              isSucceed: false,
              followerList: [],
              errorMessage: err.message
            };
          }
        });
      }, "getGitHUbFlower");
      exports.getGitHUbFlower = getGitHUbFlower;
    }
  });

  // dist/services/svgService.js
  var require_svgService = __commonJS({
    "dist/services/svgService.js"(exports) {
      "use strict";
      init_middleware_insertion_facade();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.generateSvg = generateSvg;
      function generateSvg(username, followerList) {
        const displayedFollowers = followerList.slice(0, 8);
        const avatarSize = 60;
        const spacing = 20;
        const startX = 20;
        const startY = 40;
        const followerItems = displayedFollowers.map((follower, index) => {
          const x = startX + index * (avatarSize + spacing);
          const y = startY - 10;
          return `
      <g>
        <image 
          x="${x}" 
          y="${y}" 
          width="${avatarSize}" 
          height="${avatarSize}"
          xlink:href="${follower.avatar_url}"
          clip-path="url(#clip-${index})"
        />
        <defs>
          <clipPath id="clip-${index}">
            <circle cx="${x + avatarSize / 2}" cy="${y + avatarSize / 2}" r="${avatarSize / 2}" />
          </clipPath>
        </defs>
        <text 
          x="${x + avatarSize / 2}" 
          y="${y + avatarSize + 15}" 
          fill="#ffffff" 
          font-size="12" 
          font-family="Arial, sans-serif"
          text-anchor="middle"
          font-weight="bold"
          stroke="#000"
          stroke-width="1"
          paint-order="stroke"
        >
          ${follower.login.length > 6 ? follower.login.substring(0, 6) + ".." : follower.login}
        </text>
      </g>
    `;
        }).join("");
        return `
    <svg width="700" height="160" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect width="100%" height="100%" fill="#1e2127" rx="10" ry="10"/>
      ${followerItems}
      <text 
        x="680" 
        y="140" 
        fill="#888888" 
        font-size="12" 
        font-family="Arial, sans-serif"
        text-anchor="end"
      >
        Total Followers: ${followerList.length}
      </text>
    </svg>
  `.trim();
      }
      __name(generateSvg, "generateSvg");
    }
  });

  // dist/handlers/cardHandler.js
  var require_cardHandler = __commonJS({
    "dist/handlers/cardHandler.js"(exports) {
      "use strict";
      init_middleware_insertion_facade();
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        __name(adopt, "adopt");
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          __name(fulfilled, "fulfilled");
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          __name(rejected, "rejected");
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          __name(step, "step");
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.cardHandler = cardHandler;
      var ghAPI_1 = require_ghAPI();
      var svgService_1 = require_svgService();
      function cardHandler(url, env) {
        return __awaiter(this, void 0, void 0, function* () {
          const username = url.searchParams.get("username") || "cjjjjjk";
          const followerList = yield (0, ghAPI_1.getGitHUbFlower)(username, env);
          const svg = (0, svgService_1.generateSvg)(username, followerList.followerList);
          return new Response(svg, {
            headers: {
              "Content-Type": "image/svg+xml",
              "Cache-Control": "no-cache"
            }
          });
        });
      }
      __name(cardHandler, "cardHandler");
    }
  });

  // dist/index.js
  var require_index = __commonJS({
    "dist/index.js"(exports) {
      init_middleware_insertion_facade();
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        __name(adopt, "adopt");
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          __name(fulfilled, "fulfilled");
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          __name(rejected, "rejected");
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          __name(step, "step");
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var cardHandler_1 = require_cardHandler();
      exports.default = {
        fetch(request, env) {
          return __awaiter(this, void 0, void 0, function* () {
            const url = new URL(request.url);
            if (url.pathname === "/user") {
              return (0, cardHandler_1.cardHandler)(url, env);
            }
            return new Response("404 Not Found", { status: 404 });
          });
        }
      };
    }
  });
  require_index();
})();
//# sourceMappingURL=index.js.map
