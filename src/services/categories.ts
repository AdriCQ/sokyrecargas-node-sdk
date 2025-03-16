import type { AxiosInstance } from 'axios';
import type {
  ICategory,
  ICategoryCreateRequest,
  ICategoryUpdateRequest,
} from '@/types';
import { generateCrudWithoutPaginate } from '@/utils';

export default function (api: AxiosInstance) {
  const baseURL: string = '/recharges/categories';

  const crud = generateCrudWithoutPaginate<
    ICategory,
    ICategoryCreateRequest,
    ICategoryUpdateRequest
  >({
    api,
    baseURL,
  });
  return {
    ...crud,
  };
}
