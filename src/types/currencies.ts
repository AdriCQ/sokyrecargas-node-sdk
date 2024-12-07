export interface ICurrency {
  id: number;
  name: string;
  code: string;
  rate: number;
  image: string;
}

export type ICurrencyCreate = Omit<ICurrency, 'id' | 'code'>;

export type ICurrencyUpdate = Partial<ICurrencyCreate>;
