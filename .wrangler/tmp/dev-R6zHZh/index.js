var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// dist/utils/getToken.js
function getToken(env) {
  return env.GITHUB_PAT || "get-token-false";
}
__name(getToken, "getToken");

// dist/services/ghAPI.js
var __awaiter = function(thisArg, _arguments, P, generator) {
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
var gitHubAPI = "https://api.github.com/users/";
var getGitHUbFlower = /* @__PURE__ */ __name(function(username, env) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const token = getToken(env);
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

// dist/metadata.js
var METADATA = {
  APP_URL: "https://svg-card.hai-hv04.workers.dev",
  APP_URL_LOCAL: "http://127.0.0.1:8787/"
};

// dist/services/svgService.js
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
          xlink:href="${`${METADATA.APP_URL}/proxy?url=${encodeURIComponent(follower.avatar_url)}`}"
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

// dist/handlers/cardHandler.js
var __awaiter2 = function(thisArg, _arguments, P, generator) {
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
function cardHandler(url, env) {
  return __awaiter2(this, void 0, void 0, function* () {
    const username = url.searchParams.get("username") || "cjjjjjk";
    const followerList = yield getGitHUbFlower(username, env);
    const svg = generateSvg(username, followerList.followerList);
    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-cache"
      }
    });
  });
}
__name(cardHandler, "cardHandler");

// dist/handlers/proxyHandler.js
var __awaiter3 = function(thisArg, _arguments, P, generator) {
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
function proxyHandler(url) {
  return __awaiter3(this, void 0, void 0, function* () {
    const targetUrl = url.searchParams.get("url");
    if (!targetUrl)
      return new Response("Missing URL", { status: 400 });
    try {
      const res = yield fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Referer": "https://github.com"
        },
        // ép kiểu tại đây
        cf: {
          cacheEverything: true,
          cacheTtl: 86400
        }
      });
      return new Response(res.body, {
        status: res.status,
        headers: {
          "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
          "Cache-Control": "public, max-age=86400"
        }
      });
    } catch (err) {
      return new Response("Failed to proxy image", { status: 500 });
    }
  });
}
__name(proxyHandler, "proxyHandler");

// dist/router.js
var __awaiter4 = function(thisArg, _arguments, P, generator) {
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
var Router = class {
  static {
    __name(this, "Router");
  }
  handle(request, env) {
    return __awaiter4(this, void 0, void 0, function* () {
      const url = new URL(request.url);
      const pathname = url.pathname;
      if (pathname === "/user") {
        return cardHandler(url, env);
      }
      if (pathname === "/proxy") {
        return proxyHandler(url);
      }
      return new Response("404 Not Found", { status: 404 });
    });
  }
};
var router = new Router();

// dist/index.js
var dist_default = {
  fetch(request, env) {
    return router.handle(request, env);
  }
};

// C:/Users/LENOVO/AppData/Roaming/nvm/v20.19.0/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
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
var middleware_ensure_req_body_drained_default = drainBody;

// C:/Users/LENOVO/AppData/Roaming/nvm/v20.19.0/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
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
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-PjLNZw/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = dist_default;

// C:/Users/LENOVO/AppData/Roaming/nvm/v20.19.0/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
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
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-PjLNZw/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
