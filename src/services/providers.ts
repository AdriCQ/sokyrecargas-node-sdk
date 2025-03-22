import type { AxiosInstance } from 'axios';
import type { IPaginatedData, IProvider } from '@/types';

export default function (api: AxiosInstance) {
  const baseURL: string = '/recharges/providers';

  return {
    list: () => api.get<IPaginatedData<IProvider>>(baseURL),
  };
}
