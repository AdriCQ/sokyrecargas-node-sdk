import type { AxiosInstance } from 'axios';
import type {
  IApiWrapper,
  IPaginatedData,
  IPaginationParams,
  IRecharge,
  IRechargeCreate,
  IRechargeFilterRequest,
  IRechargeUpdateRequest,
} from '@/types';

export default function (api: AxiosInstance) {
  const baseURL: string = '/recharges';

  return {
    /**
     * list
     * @param params
     */
    list: (params?: IRechargeFilterRequest) =>
      api.get<IPaginatedData<IRecharge>>(baseURL, { params }),
    /**
     * store
     * @param params
     */
    store: (params: IRechargeCreate) =>
      api.post<IApiWrapper<IRecharge>>(baseURL, params),
    /**
     * mine
     * @param params
     */
    mine: (params?: IPaginationParams) =>
      api.get<IPaginatedData<IRecharge>>(`${baseURL}/mine`, {
        params,
      }),
    /**
     * show
     * @param id
     */
    show: (id: number) => api.get<IApiWrapper<IRecharge>>(`${baseURL}/${id}`),
    update: (id: number, param: IRechargeUpdateRequest) =>
      api.patch<IApiWrapper<IRecharge>>(`${baseURL}/${id}`, param),
  };
}
