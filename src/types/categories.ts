export interface ICategory {
  id: number;
  name: string;
}

export interface ICategoryCreateRequest {
  name: string;
  parent_id?: number;
}

export type ICategoryUpdateRequest = Partial<ICategoryCreateRequest>;
