import type { AxiosInstance } from 'axios';
import type { IApiWrapper, IProvider } from '@/types';

export default function (api: AxiosInstance) {
  const baseURL: string = '/recharges/providers';

  return {
    list: () => api.get<IApiWrapper<IProvider>>(baseURL),
  };
}
