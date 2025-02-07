export interface ICategory {
  id: number;
  name: string;
}

export interface ICategoryCreateRequest {
  name: string;
  parent_id?: number | undefined;
}

export type ICategoryUpdateRequest = Partial<ICategoryCreateRequest>;
