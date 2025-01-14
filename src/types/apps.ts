import { IUser } from '@/types/users';

export interface IApp {
  id: number;
  name: string;
  image: string | null;
  url: string | null;
  available: boolean;
  user?: IUser;
  meta: IAppMeta[] | null;
  version: number | null;
  build: string | null;
}

type IAppMeta = {
  key: string;
  value: string;
};

export interface IAppCreateRequest {
  name: string;
  image: string | null;
  url: string | null;
  available: boolean;
  user_email: string;
  meta: IAppMeta[] | null;
}

export type IAppUpdateRequest = Partial<Omit<IAppCreateRequest, 'user_email'>>;
