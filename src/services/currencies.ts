import { AxiosInstance } from 'axios';
import {
  ICurrency,
  ICurrencyCreate,
  ICurrencyUpdate,
} from '@/types/currencies';
import { generateCrudWithoutPaginate } from '@/utils';

export default function (api: AxiosInstance) {
  const baseURL = '/coins/currencies';

  const crud = generateCrudWithoutPaginate<
    ICurrency,
    ICurrencyCreate,
    ICurrencyUpdate
  >({ baseURL, api, multipart: true });

  return {
    ...crud,
  };
}
