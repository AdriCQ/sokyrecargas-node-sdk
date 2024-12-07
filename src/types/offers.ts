import type { ICategory } from './categories';
import { IOperator } from '@/types/operators';
import { IPaginationParams } from '@/types/pagination';

export interface IOffer {
  id: number;
  name: string;
  image: string | null;
  image_promo: string | null;
  description: string | null;
  prices: IOfferPrice[];
  available?: boolean;
  category: ICategory | null;
  operator: IOperator;
  start_date: null | string | Date;
  end_date: null | string | Date;
}

export interface IOfferCreateRequest
  extends Omit<
    IOffer,
    'id' | 'image' | 'image_promo' | 'category' | 'operator'
  > {
  category_id?: number;
  operator_code: string;
  image?: File;
  image_promo?: File;
  start_date: null | string;
  end_date: null | string;
}

export type IOfferUpdateRequest = Partial<IOfferCreateRequest>;

export interface IOfferFilterRequest extends IPaginationParams {
  operator_code?: string;
  search?: string;
  available?: string;
  category_id?: number;
  start_date?: null | string;
  end_date?: null | string;
  for_customer?: boolean;
}

export type IOfferPrice = {
  id?: string;
  label: string;
  value: number;
  value_private?: number;
};

export interface IOfferRecharge {
  recipient: string;
  price_id: string;
}
