import type { AxiosInstance } from 'axios';
import type { IApiWrapper, IPaginatedData, IPaginationParams } from '@/types';

const multipartHeader = {
  'Content-Type': 'multipart/form-data',
};

/**
 * generateCrud
 * @param param GenerateCrudParams
 * @returns
 */
function generateCrud<
  Model,
  Create = Omit<Model, 'id'>,
  Update = Partial<Create>,
  Filter = IPaginationParams,
>({ api, baseURL, multipart }: GenerateCrudParams) {
  const headers = multipart
    ? {
        'Content-Type': 'multipart/form-data',
      }
    : undefined;

  return {
    list: (params?: Filter) =>
      api.get<IPaginatedData<Model>>(baseURL, { params }),
    show: (id: number | string) =>
      api.get<IApiWrapper<Model>>(`${baseURL}/${id}`),
    create: (params: Create) =>
      api.post<IApiWrapper<Model>>(`${baseURL}`, params, { headers }),
    update: (id: number | string, params: Update) =>
      multipart
        ? api.post<IApiWrapper<Model>>(`${baseURL}/${id}`, params, { headers })
        : api.patch<IApiWrapper<Model>>(`${baseURL}/${id}`, params, {
            headers,
          }),
    remove: (id: number) => api.delete(`${baseURL}/${id}`),
  };
}

/**
 * generateCrudWithoutPaginate
 * @param param GenerateCrudParams
 * @returns
 */
function generateCrudWithoutPaginate<
  Model,
  Create = Omit<Model, 'id'>,
  Update = Partial<Create>,
  Filter = undefined,
>({ api, baseURL, multipart }: GenerateCrudParams) {
  const headers = multipart
    ? {
        'Content-Type': 'multipart/form-data',
      }
    : undefined;

  return {
    list: (params?: Filter) =>
      api.get<IApiWrapper<Model[]>>(baseURL, { params }),
    show: (id: number | string) =>
      api.get<IApiWrapper<Model>>(`${baseURL}/${id}`),
    create: (params: Create) =>
      api.post<IApiWrapper<Model>>(`${baseURL}`, params, { headers }),
    update: (id: number | string, params: Update) =>
      multipart
        ? api.post<IApiWrapper<Model>>(`${baseURL}/${id}`, params, { headers })
        : api.patch<IApiWrapper<Model>>(`${baseURL}/${id}`, params, {
            headers,
          }),
    remove: (id: number) => api.delete(`${baseURL}/${id}`),
  };
}

interface GenerateCrudParams {
  api: AxiosInstance;
  baseURL: string;
  multipart?: boolean;
}

export { generateCrud, generateCrudWithoutPaginate, multipartHeader };
