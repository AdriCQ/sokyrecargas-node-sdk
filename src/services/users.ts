import type { AxiosInstance } from 'axios';
import type {
  IApiWrapper,
  IPaginatedData,
  IUser,
  IUserAuthResponse,
  IUserFilterRequest,
  IUserLoginRequest,
  IUserRegisterRequest,
  IUserUpdateRequest,
} from '@/types';

export default function (api: AxiosInstance) {
  const baseUrl: string = '/users';
  const authUrl: string = baseUrl + '/auth';

  return {
    auth: {
      /**
       * Get current authenticated user
       */
      current: () => api.get<IUserAuthResponse>(`${authUrl}/current`),
      /**
       * Login user
       * @param params
       */
      login: (params: IUserLoginRequest) =>
        api.post<IUserAuthResponse>(`${authUrl}/login`, params),
      /**
       * logout
       */
      logout: () => api.post(`${authUrl}/logout`),
      /**
       * Register new User
       * @param params
       */
      register: (params: IUserRegisterRequest) =>
        api.post<IUserAuthResponse>(`${authUrl}/register`, params),
    },

    list: (params?: IUserFilterRequest) =>
      api.get<IPaginatedData<IUser>>(baseUrl, { params }),
    show: (id: number) => api.get<IApiWrapper<IUser>>(`${baseUrl}/${id}`),
    update: (id: number, params: IUserUpdateRequest) =>
      api.patch<IApiWrapper<IUser>>(`${baseUrl}/${id}`, params),
  };
}
