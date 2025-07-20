import { AxiosInstance } from 'axios';
import { IPaymentVerify } from '@/types';

export default function (api: AxiosInstance) {
  const baseURL = '/payments';

  return {
    verify: (params: IPaymentVerify) =>
      api.get(`${baseURL}/verify`, { params }),
  };
}
