import type { AxiosInstance } from 'axios';
import { generateCrudWithoutPaginate } from '@/utils';
import type { IApp, IAppCreateRequest, IAppUpdateRequest } from '@/types/apps';
import { IApiWrapper } from '@/types';

export default function (api: AxiosInstance) {
  const baseURL: string = '/apps';

  const crud = generateCrudWithoutPaginate<
    IApp,
    IAppCreateRequest,
    IAppUpdateRequest
  >({
    api,
    baseURL,
  });
  return {
    ...crud,
    current: () => api.get<IApiWrapper<IApp>>(`${baseURL}/current`),
    notify: (id: number) =>
      api.get<IApiWrapper<IApp>>(`${baseURL}/notify/${id}`),
  };
}
