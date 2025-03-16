import type { AxiosInstance } from 'axios';
import { generateCrudWithoutPaginate } from '@/utils';
import type {
  IOffer,
  IOfferCreateRequest,
  IOfferFilterRequest,
  IOfferRecharge,
  IOfferUpdateRequest,
} from '@/types/offers';
import { IApiWrapper, IRecharge } from '@/types';

export default function (api: AxiosInstance) {
  const baseURL: string = '/recharges/offers';

  const crud = generateCrudWithoutPaginate<
    IOffer,
    IOfferCreateRequest,
    IOfferUpdateRequest,
    IOfferFilterRequest
  >({
    api,
    baseURL,
    multipart: true,
  });
  return {
    ...crud,
    filterAdmin: (params: IOfferFilterRequest) =>
      api.get<IApiWrapper<IOffer[]>>(`${baseURL}/admin`, { params }),
    recharge: (offerId: number, params: IOfferRecharge) =>
      api.post<IApiWrapper<IRecharge>>(
        `${baseURL}/${offerId}/recharge`,
        params,
      ),
    rechargeStacked: (offerId: number, params: IOfferRecharge) =>
      api.post<IApiWrapper<IRecharge>>(
        `${baseURL}/${offerId}/recharge-stacked`,
        params,
      ),
  };
}
