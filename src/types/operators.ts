export interface IOperator {
  id: number;
  code: string;
  name: string;
  available: boolean;
  image: null | string;
}

export interface IOperatorCreate {
  code: string;
  name: string;
  available: boolean;
  image: null | File;
}

export type IOperatorUpdate = Partial<IOperatorCreate>;
