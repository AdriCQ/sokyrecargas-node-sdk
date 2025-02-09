import type { AxiosInstance } from 'axios';
import type { IApiWrapper, IDashboardStats, IUserStats } from '@/types';

export default function (api: AxiosInstance) {
  const baseUrl: string = '/stats';

  return {
    mine: () => api.get<IApiWrapper<IUserStats>>(baseUrl),
    dashboard: () =>
      api.get<IApiWrapper<IDashboardStats>>(`${baseUrl}/dashboard`),
  };
}
