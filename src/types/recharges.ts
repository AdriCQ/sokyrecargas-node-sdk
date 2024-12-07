import type { IOperator } from './operators';
import type { IUser } from './users';
import { IPaginationParams } from '@/types/pagination';

export interface IRecharge {
  id: number;
  operator: IOperator;
  user: IUser;
  status: RechargeStatus;
  amount: number;
  recipient: string;
  recipient_name: string;
  created_at: string | Date | null;
  updated_at: string | Date | null;
}

export interface IRechargeFilterRequest extends IPaginationParams {
  operator_id?: number;
  user_id?: number;
  status?: RechargeStatus;
  recipient?: string;
}

export enum RechargeStatus {
  CANCELED = 'canceled',
  COMPLETED = 'completed',
  PENDING = 'pending',
}

export interface IRechargeCreate {
  amount: number;
  operator_code: string;
  recipient: string;
  recipient_name: string | null;
}

export interface IRechargeUpdateRequest {
  status?: RechargeStatus.CANCELED;
  recipient?: string;
  recipient_name?: string;
}
