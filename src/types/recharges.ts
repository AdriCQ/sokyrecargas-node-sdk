import type { IOffer } from '@/types/offers';
import type { IOperator } from '@/types/operators';
import type { IPaginationParams } from '@/types/pagination';
import type { IProvider } from '@/types/providers';
import type { IUser } from '@/types/users';

export interface IRecharge {
  id: number;
  operator: IOperator;
  price_label: string;
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
  provider?: IProvider | null | undefined;
  metadata?: IRechargeMetadata | null;
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

export interface IRechargeMetadata {
  agent: IUser | null;
  telegram_chat_id: string | null;
  telegram_message_id: string | null;
  comments: string | null;
}
