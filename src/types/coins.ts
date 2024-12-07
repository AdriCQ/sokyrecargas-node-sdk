import type { IUser } from './users';
import { IPaginationParams } from '@/types/pagination';

export enum CoinTransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum CoinTransactionType {
  WITHDRAWAL = 'withdrawal',
  DEPOSIT = 'deposit',
  TRANSFER = 'transfer',
  REFUND = 'refund',
  CONSUME = 'consume',
}

export interface ICoinTransaction {
  id: number;
  fromUser: IUser;
  toUser: IUser;
  amount: number;
  type: CoinTransactionType;
  status: CoinTransactionStatus;
  comment: string | null;
  created_at: string | Date;
  updated_at: string | Date | null;
}

export interface ICoinTransferenceRequest {
  to_user_email: string;
  amount: number;
  comment?: string;
}

export type ICoinTopUpRequest = {
  amount: number;
  user_id?: number;
  currency: number;
  completed?: boolean;
};

export interface ICoinTransactionFilterRequest extends IPaginationParams {
  from_user_id?: number;
  to_user_id?: number;
  status?: CoinTransactionStatus;
}
