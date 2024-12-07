import type { AxiosInstance } from 'axios';
import { generateCrudWithoutPaginate } from '@/utils';
import type { IOperator, IOperatorCreate, IOperatorUpdate } from '@/types';

export default function (api: AxiosInstance) {
  const baseURL: string = '/recharges/operators';

  const crud = generateCrudWithoutPaginate<
    IOperator,
    IOperatorCreate,
    IOperatorUpdate
  >({
    api,
    baseURL,
    multipart: true,
  });
  return {
    ...crud,
  };
}
