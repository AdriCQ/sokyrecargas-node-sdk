import type { IOffer } from './offers';
import type { IOperator } from './operators';
import type { IUser } from './users';
import type { IPaginationParams } from '@/types/pagination';

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
  is_stacked: boolean;
  stacked_at: null | Date | string;
  retries: number | null;
  completed_at: null | Date | string;
  offer?: IOffer | undefined;
}

export interface IRechargeFilterRequest extends IPaginationParams {
  operator_id?: number | undefined;
  user_id?: number | undefined;
  status?: RechargeStatus | undefined;
  recipient?: string | undefined;
  is_stacked?: boolean | undefined;
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
  status?: RechargeStatus.CANCELED | undefined;
  recipient?: string | undefined;
  recipient_name?: string | undefined;
}
