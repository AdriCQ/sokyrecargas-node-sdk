import type { AxiosInstance } from 'axios';
import type {
  IApiWrapper,
  ICoinTopUpRequest,
  ICoinTransaction,
  ICoinTransactionFilterRequest,
  ICoinTransferenceRequest,
  IPaginatedData,
  IPaginationParams,
} from '@/types';

export default function (api: AxiosInstance) {
  const baseUrl: string = '/coins/transactions';

  return {
    list: (params?: ICoinTransactionFilterRequest) =>
      api.get<IPaginatedData<ICoinTransaction>>(baseUrl, { params }),
    mine: (params?: IPaginationParams) =>
      api.get<IPaginatedData<ICoinTransaction>>(`${baseUrl}/mine`, { params }),
    topUp: (params: ICoinTopUpRequest) =>
      api.post<IApiWrapper<ICoinTransaction>>(`${baseUrl}/top-up`, params),
    transference: (params: ICoinTransferenceRequest) =>
      api.post<IApiWrapper<ICoinTransaction>>(
        `${baseUrl}/transference`,
        params,
      ),
    show: (id: number) =>
      api.get<IApiWrapper<ICoinTransaction>>(`${baseUrl}/${id}`),
    complete: (id: number) =>
      api.patch<IApiWrapper<ICoinTransaction>>(`${baseUrl}/${id}/complete`),
  };
}
