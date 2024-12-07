import type { AxiosInstance } from 'axios';
import {
  IApiWrapper,
  ISiteBanner,
  ISiteBannerCreate,
  ISiteBannerUpdate,
} from '@/types';

export default function (api: AxiosInstance) {
  const baseURL: string = '/settings/';
  return {
    banners: {
      list: async () =>
        api.get<IApiWrapper<ISiteBanner[]>>(`${baseURL}/banners`),
      create: (params: ISiteBannerCreate) =>
        api.post<IApiWrapper<ISiteBanner>>(`${baseURL}/banners`, params),
      update: (id: number, params: ISiteBannerUpdate) =>
        api.post<IApiWrapper<ISiteBanner>>(`${baseURL}/banners/${id}`, params),
    },
  };
}
