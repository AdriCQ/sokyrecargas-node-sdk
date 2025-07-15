import type { ICategory } from '@/types/categories';
import type { ICurrency } from '@/types/currencies';
import type { IOperator } from '@/types/operators';
import type { IPaginationParams } from '@/types/pagination';
import type { IProvider } from '@/types/providers';

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
  provider?: IProvider | null | undefined;
  metadata?: IOfferMetadata | null;
}

export interface IOfferCreateRequest
  extends Omit<
    IOffer,
    'id' | 'image' | 'image_promo' | 'category' | 'operator' | 'currency'
  > {
  category_id?: number;
  provider_id?: number;
  operator_code: string;
  currency_id: number;
  image_custom?: string | undefined | null;
  image?: File | undefined;
  image_promo?: File;
  start_date: null | string;
  end_date: null | string;
  has_email: boolean | null;
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
  public: number;
  private?: number;
  reseller?: number;
  operator_id?: number | null;
  operator?: IOperator;
};

export interface IOfferRecharge {
  recipient: string;
  price_id: string;
  email: string | null | undefined;
}

export interface IOfferInput {
  type: 'phone' | 'email';
  label: string;
  isRequired: boolean;
}

export interface IOfferMetadata {
  inputs: IOfferInput[];
  has_email: boolean;
}
