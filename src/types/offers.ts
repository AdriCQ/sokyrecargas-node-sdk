import type { ICategory } from './categories';
import { IOperator } from '@/types/operators';
import { IPaginationParams } from '@/types/pagination';
import { ICurrency } from './currencies';

export interface IOffer {
  id: number;
  name: string;
  image: string | null;
  image_promo: string | null;
  description: string | null;
  prices: IOfferPrice[];
  available?: boolean | undefined;
  category: ICategory | null;
  currency: ICurrency;
  operator: IOperator;
  start_date: null | string;
  end_date: null | string;
  is_stackable: boolean;
}

export interface IOfferCreateRequest
  extends Omit<
    IOffer,
    'id' | 'image' | 'image_promo' | 'category' | 'operator' | 'currency'
  > {
  category_id?: number;
  operator_code: string;
  currency_id: number;
  image?: File | undefined;
  image_promo?: File;
  start_date: null | string;
  end_date: null | string;
}

export type IOfferUpdateRequest = Partial<IOfferCreateRequest>;

export interface IOfferFilterRequest extends IPaginationParams {
  operator_code?: string | undefined;
  search?: string | undefined;
  available?: string | undefined;
  category_id?: number | undefined;
  start_date?: null | string | undefined;
  end_date?: null | string | undefined;
  for_customer?: boolean | undefined;
}

export type IOfferPrice = {
  id?: string | undefined;
  label: string;
  value: number;
  value_private?: number;
};

export interface IOfferRecharge {
  recipient: string;
  price_id: string;
}
