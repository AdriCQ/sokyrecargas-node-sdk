import type { AxiosInstance } from 'axios';
import type {
  IApiWrapper,
  IPaginatedData,
  IUser,
  IUserAuthResponse,
  IUserDetails,
  IUserFilterRequest,
  IUserLoginRequest,
  IUserMetadata,
  IUserRegisterRequest,
  IUserResetPasswordRequest,
  IUserUpdateProfileRequest,
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
      verifyEmail: (userId: number, token: string) =>
        api.post(`${authUrl}/verify-email/${userId}/${token}`),
      sendEmailVerification: () =>
        api.post(`${authUrl}/email/verification-notification`),
      forgotPassword: (email: string) =>
        api.post(`${authUrl}/forgot-password`, { email }),
      resetPassword: (params: IUserResetPasswordRequest) =>
        api.post(`${authUrl}/reset-password`, params),
    },
    admin: {
      list: (params?: IUserFilterRequest) =>
        api.get<IPaginatedData<IUser>>(baseUrl, { params }),
      show: (id: number) =>
        api.get<IApiWrapper<IUserDetails>>(`${baseUrl}/${id}`),
      updateMetadata: (userId: number, params: Partial<IUserMetadata>) =>
        api.patch(`${baseUrl}/${userId}/update-metadata`, params),
    },
    profile: {
      update: (params: IUserUpdateProfileRequest) =>
        api.patch<IApiWrapper<IUser>>(`${baseUrl}/update-profile`, params),
    },
  };
}
