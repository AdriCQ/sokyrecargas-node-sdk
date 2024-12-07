var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/utils/crud.ts
function generateCrudWithoutPaginate({ api, baseURL, multipart }) {
  const headers = multipart ? {
    "Content-Type": "multipart/form-data"
  } : void 0;
  return {
    list: (params) => api.get(baseURL, { params }),
    show: (id) => api.get(`${baseURL}/${id}`),
    create: (params) => api.post(`${baseURL}`, params, { headers }),
    update: (id, params) => multipart ? api.post(`${baseURL}/${id}`, params, { headers }) : api.patch(`${baseURL}/${id}`, params, {
      headers
    }),
    remove: (id) => api.delete(`${baseURL}/${id}`)
  };
}

// src/utils/initApi.ts
import axios from "axios";

// src/utils/crypt.ts
function useCrypt() {
  return {
    decode: (data) => {
      return JSON.parse(decodeURI(atob(data)));
    },
    encode: (data) => {
      return btoa(encodeURI(JSON.stringify(data)));
    }
  };
}

// src/utils/localStorage.ts
function useStorage(key, encrypted = false) {
  const { decode, encode } = useCrypt();
  return {
    get: () => {
      const data = localStorage.getItem(`${window.location.host}/${key}`);
      if (data) {
        return encrypted ? decode(data) : JSON.parse(data);
      }
      return null;
    },
    set: (data) => {
      const storeData = encrypted ? encode(data) : JSON.stringify(data);
      localStorage.setItem(`${window.location.host}/${key}`, storeData);
      return storeData;
    },
    remove: () => localStorage.removeItem(`${window.location.host}/${key}`)
  };
}

// src/utils/tokenHandler.ts
function defaultTokenHandler() {
  const storage = useStorage("auth_token", true);
  return {
    get: () => storage.get(),
    set: (token) => storage.set(token)
  };
}

// src/utils/interceptors.ts
function useErrorHandler(params) {
  const { defaultError, logout, handleError } = params;
  return {
    onFulfilled: (response) => response,
    onRejected: (error) => {
      var _a;
      console.log({ requestError: error });
      if (((_a = error == null ? void 0 : error.response) == null ? void 0 : _a.status) === 401) {
        logout();
        if (defaultError && defaultError.unauthorized)
          handleError(defaultError.unauthorized);
      }
      if (error.response.data.errors) {
        const errorList = Object.keys(error.response.data.errors).map((key) => [
          key,
          error.response.data.errors[key][0]
        ]);
        errorList.forEach((i) => {
          handleError(i[1]);
        });
      } else if (error.response.data.data) {
        if (typeof error.response.data.data === "object") {
          const errorList = Object.keys(error.response.data.data).map((key) => [
            key,
            error.response.data.data[key][0]
          ]);
          errorList.forEach((i) => {
            handleError(i[1]);
          });
        } else {
          handleError(error.response.data.data);
        }
      } else if (error.response.data.message) {
        handleError(error.response.data.message);
      }
      return Promise.reject(error.response);
    }
  };
}
function useHeadersInterceptor(params) {
  const { appToken, tokenHandler } = params;
  return {
    onFulfilled: (_request) => __async(this, null, function* () {
      let authToken = null;
      if (tokenHandler.get !== void 0) authToken = tokenHandler.get();
      else if (tokenHandler.getPromise !== void 0)
        authToken = yield tokenHandler.getPromise();
      if (!_request.headers["App-Token"]) {
        _request.headers["App-Token"] = appToken;
      }
      if (!_request.headers["Content-Type"]) {
        _request.headers["Content-Type"] = "application/json";
      }
      if (authToken && authToken.length > 0) {
        if (!_request.headers["Authorization"]) {
          _request.headers.Authorization = "Bearer " + authToken;
        }
      }
      return _request;
    })
  };
}

// src/utils/initApi.ts
function initApi(params) {
  const { appToken } = params;
  let tokenHandler = defaultTokenHandler();
  if (params) {
    if (params.tokenHandler) tokenHandler = params.tokenHandler;
  }
  const api = axios.create({
    baseURL: params == null ? void 0 : params.baseURL,
    withCredentials: true
  });
  const headersInterceptor = useHeadersInterceptor({
    appToken,
    tokenHandler
  });
  api.interceptors.request.use(
    headersInterceptor.onFulfilled,
    headersInterceptor.onRejected,
    headersInterceptor.options
  );
  if (params == null ? void 0 : params.errorHandler) {
    const errorHandler = useErrorHandler(params.errorHandler);
    api.interceptors.response.use(
      errorHandler.onFulfilled,
      errorHandler.onRejected,
      errorHandler.options
    );
  }
  return api;
}

// src/services/apps.ts
function apps_default(api) {
  const baseURL = "/apps";
  const crud = generateCrudWithoutPaginate({
    api,
    baseURL
  });
  return __spreadProps(__spreadValues({}, crud), {
    current: () => api.get(`${baseURL}/current`),
    notify: (id) => api.get(`${baseURL}/notify/${id}`)
  });
}

// src/services/categories.ts
function categories_default(api) {
  const baseURL = "/recharges/categories";
  const crud = generateCrudWithoutPaginate({
    api,
    baseURL
  });
  return __spreadValues({}, crud);
}

// src/services/coins.ts
function coins_default(api) {
  const baseUrl = "/coins/transactions";
  return {
    list: (params) => api.get(baseUrl, { params }),
    mine: (params) => api.get(`${baseUrl}/mine`, { params }),
    topUp: (params) => api.post(`${baseUrl}/top-up`, params),
    transference: (params) => api.post(
      `${baseUrl}/transference`,
      params
    ),
    show: (id) => api.get(`${baseUrl}/${id}`),
    complete: (id) => api.patch(`${baseUrl}/${id}/complete`)
  };
}

// src/services/currencies.ts
function currencies_default(api) {
  const baseURL = "/coins/currencies";
  const crud = generateCrudWithoutPaginate({ baseURL, api, multipart: true });
  return __spreadValues({}, crud);
}

// src/services/offers.ts
function offers_default(api) {
  const baseURL = "/recharges/offers";
  const crud = generateCrudWithoutPaginate({
    api,
    baseURL,
    multipart: true
  });
  return __spreadProps(__spreadValues({}, crud), {
    filterAdmin: (params) => api.get(`${baseURL}/admin`, { params }),
    recharge: (offerId, params) => api.post(
      `${baseURL}/${offerId}/recharge`,
      params
    ),
    rechargeStacked: (offerId, params) => api.post(
      `${baseURL}/${offerId}/recharge-stacked`,
      params
    )
  });
}

// src/services/operators.ts
function operators_default(api) {
  const baseURL = "/recharges/operators";
  const crud = generateCrudWithoutPaginate({
    api,
    baseURL,
    multipart: true
  });
  return __spreadValues({}, crud);
}

// src/services/recharges.ts
function recharges_default(api) {
  const baseURL = "/recharges";
  return {
    /**
     * list
     * @param params
     */
    list: (params) => api.get(baseURL, { params }),
    /**
     * store
     * @param params
     */
    store: (params) => api.post(baseURL, params),
    /**
     * mine
     * @param params
     */
    mine: (params) => api.get(`${baseURL}/mine`, {
      params
    }),
    /**
     * show
     * @param id
     */
    show: (id) => api.get(`${baseURL}/${id}`),
    update: (id, param) => api.patch(`${baseURL}/${id}`, param)
  };
}

// src/services/settings.ts
function settings_default(api) {
  const baseURL = "/settings/";
  return {
    banners: {
      list: () => __async(this, null, function* () {
        return api.get(`${baseURL}/banners`);
      }),
      create: (params) => api.post(`${baseURL}/banners`, params),
      update: (id, params) => api.post(`${baseURL}/banners/${id}`, params)
    }
  };
}

// src/services/stats.ts
function stats_default(api) {
  const baseUrl = "/stats";
  return {
    mine: () => api.get(baseUrl)
  };
}

// src/services/users.ts
function users_default(api) {
  const baseUrl = "/users";
  const authUrl = baseUrl + "/auth";
  return {
    auth: {
      /**
       * Get current authenticated user
       */
      current: () => api.get(`${authUrl}/current`),
      /**
       * Login user
       * @param params
       */
      login: (params) => api.post(`${authUrl}/login`, params),
      /**
       * logout
       */
      logout: () => api.post(`${authUrl}/logout`),
      /**
       * Register new User
       * @param params
       */
      register: (params) => api.post(`${authUrl}/register`, params)
    },
    list: (params) => api.get(baseUrl, { params }),
    show: (id) => api.get(`${baseUrl}/${id}`),
    update: (id, params) => api.patch(`${baseUrl}/${id}`, params)
  };
}

// src/types/coins.ts
var CoinTransactionStatus = /* @__PURE__ */ ((CoinTransactionStatus2) => {
  CoinTransactionStatus2["PENDING"] = "pending";
  CoinTransactionStatus2["SUCCESS"] = "success";
  CoinTransactionStatus2["FAILED"] = "failed";
  return CoinTransactionStatus2;
})(CoinTransactionStatus || {});
var CoinTransactionType = /* @__PURE__ */ ((CoinTransactionType2) => {
  CoinTransactionType2["WITHDRAWAL"] = "withdrawal";
  CoinTransactionType2["DEPOSIT"] = "deposit";
  CoinTransactionType2["TRANSFER"] = "transfer";
  CoinTransactionType2["REFUND"] = "refund";
  CoinTransactionType2["CONSUME"] = "consume";
  return CoinTransactionType2;
})(CoinTransactionType || {});

// src/types/recharges.ts
var RechargeStatus = /* @__PURE__ */ ((RechargeStatus2) => {
  RechargeStatus2["CANCELED"] = "canceled";
  RechargeStatus2["COMPLETED"] = "completed";
  RechargeStatus2["PENDING"] = "pending";
  return RechargeStatus2;
})(RechargeStatus || {});

// src/types/users.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["ADMIN"] = "admin";
  UserRole2["GUEST"] = "guest";
  return UserRole2;
})(UserRole || {});

// src/main.ts
function setup(_api) {
  const api = _api != null ? _api : initApi({ appToken: "", baseURL: "http://localhost:8000" });
  return {
    api,
    app: apps_default(api),
    category: categories_default(api),
    coin: coins_default(api),
    currency: currencies_default(api),
    offer: offers_default(api),
    operator: operators_default(api),
    recharge: recharges_default(api),
    settings: settings_default(api),
    stats: stats_default(api),
    user: users_default(api)
  };
}
var main_default = setup;
export {
  CoinTransactionStatus,
  CoinTransactionType,
  RechargeStatus,
  UserRole,
  main_default as default,
  defaultTokenHandler,
  initApi,
  useErrorHandler,
  useHeadersInterceptor
};
//# sourceMappingURL=main.js.map