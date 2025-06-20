export interface IProvider {
  id: number;
  name: string;
  type: string;
}

export type ProviderType = 'PON_TU_RECARGA' | 'AGENTS' | 'SUENA_CUBA';
