import type {
  AxiosInterceptorOptions,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { TokenHandler } from './tokenHandler';

/**
 * useErrorHandler
 * @param params
 * @returns
 */
export function useErrorHandler(params: ErrorHandlerParams): InterceptorUse {
  const { defaultError, logout, handleError } = params;

  return {
    onFulfilled: (response) => response,
    onRejected: (error) => {
      console.log({ requestError: error });

      // Unauthenticated
      if (error?.response?.status === 401) {
        logout();
        if (defaultError && defaultError.unauthorized)
          handleError(defaultError.unauthorized);
      }
      if (error.response.data.errors) {
        const errorList = Object.keys(error.response.data.errors).map((key) => [
          key,
          error.response.data.errors[key][0],
        ]);
        errorList.forEach((i) => {
          handleError(i[1]);
        });
      } else if (error.response.data.data) {
        if (typeof error.response.data.data === 'object') {
          const errorList = Object.keys(error.response.data.data).map((key) => [
            key,
            error.response.data.data[key][0],
          ]);
          errorList.forEach((i) => {
            // handleError(`${i[0]}: ${i[1]}`)
            handleError(i[1]);
          });
        } else {
          handleError(error.response.data.data);
        }
      } else if (error.response.data.message) {
        handleError(error.response.data.message);
      }
      return Promise.reject(error.response);
    },
  };
}

/**
 * headersInterceptor
 * @param params
 * @returns
 */
export function useHeadersInterceptor(params: {
  appToken: string;
  tokenHandler: TokenHandler;
}): InterceptorUse<InternalAxiosRequestConfig<any>> {
  const { appToken, tokenHandler } = params;

  return {
    onFulfilled: async (_request) => {
      let authToken: string | null = null;

      if (tokenHandler.get !== undefined) authToken = tokenHandler.get();
      else if (tokenHandler.getPromise !== undefined)
        authToken = await tokenHandler.getPromise();

      if (!(_request.headers as AxiosRequestHeaders)['App-Token']) {
        (_request.headers as AxiosRequestHeaders)['App-Token'] = appToken;
      }

      if (!(_request.headers as AxiosRequestHeaders)['Content-Type']) {
        (_request.headers as AxiosRequestHeaders)['Content-Type'] =
          'application/json';
      }

      if (authToken && authToken.length > 0) {
        /* Check if authorization is set */
        if (!(_request.headers as AxiosRequestHeaders)['Authorization']) {
          /* Check if the user is authenticated to send Bearer token */
          (_request.headers as AxiosRequestHeaders).Authorization =
            'Bearer ' + authToken;
        }
      }
      return _request;
    },
  };
}

export interface ErrorHandlerParams {
  defaultError?: {
    unauthorized: string;
  };
  logout: () => void;
  handleError: (error: string) => void;
}

interface InterceptorUse<V = AxiosResponse<any, any>> {
  onFulfilled?: ((value: V) => V | Promise<V>) | null;
  onRejected?: ((error: any) => any) | null;
  options?: AxiosInterceptorOptions;
}
