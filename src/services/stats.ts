import type { AxiosInstance } from 'axios';
import type { IApiWrapper, IUserStats } from '@/types';

export default function (api: AxiosInstance) {
  const baseUrl: string = '/stats';

  return {
    mine: () => api.get<IApiWrapper<IUserStats>>(baseUrl),
  };
}
