import type { AxiosInstance } from 'axios';
import { initApi } from './utils';
import {
  AppService,
  CategoryService,
  CoinService,
  CurrencyService,
  OfferService,
  OperatorService,
  RechargesService,
  SettingsService,
  StatsService,
  UserService,
} from './services';

function setup(_api?: AxiosInstance) {
  const api =
    _api ?? initApi({ appToken: '', baseURL: 'http://localhost:8000' });

  return {
    api,
    app: AppService(api),
    category: CategoryService(api),
    coin: CoinService(api),
    currency: CurrencyService(api),
    offer: OfferService(api),
    operator: OperatorService(api),
    recharge: RechargesService(api),
    settings: SettingsService(api),
    stats: StatsService(api),
    user: UserService(api),
  };
}

export default setup;

/**
 * Types
 */
export * from './types/apps';
export * from './types/categories';
export * from './types/coins';
export * from './types/currencies';
export * from './types/misc';
export * from './types/offers';
export * from './types/operators';
export * from './types/pagination';
export * from './types/recharges';
export * from './types/settings';
export * from './types/stats';
export * from './types/users';

/**
 * Utils
 */
export * from './utils/initApi';
export * from './utils/interceptors';
export * from './utils/tokenHandler';
