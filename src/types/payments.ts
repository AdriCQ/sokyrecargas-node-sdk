export interface IPayment {
  id: number;
  amount: number;
  status: PaymentStatus;
  historic: unknown[];
  created_at: string;
  updated_at: string;
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  COMPLETED = 'completed',
}

export interface IPaymentVerify {
  external_id: string;
  transaction_id: number;
}
