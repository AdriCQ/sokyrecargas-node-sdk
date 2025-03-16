import type { IPaginationParams } from '@/types/pagination';

/**
 * User
 */
export interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  phone: string;
  phone_verified_at: string | null;
  coins: number;
  role: UserRole;
}

export interface IUserMetadata {
  birthday: string | null;
  gender: 'm' | 'f' | 'x' | null;
  telegram_chat_id: string | null;
  country_code: string | null;
  is_premium: boolean;
  is_reseller: boolean;
  is_banned: boolean;
  banned_at: string | null;
  banned_reason: string | null;
  can_recharge: boolean;
  can_recharge_another: boolean;
  can_topup: boolean;
  can_transfer: boolean;
  can_withdraw: boolean;
  observations: string | null;
}

export interface IUserDetails extends IUser {
  metadata: IUserMetadata;
}

/**
 * UserRole
 */
export enum UserRole {
  ADMIN = 'admin',
  GUEST = 'guest',
}

export interface IUserFilterRequest extends IPaginationParams {
  email?: string | undefined;
  name?: string | undefined;
  phone?: string | undefined;
  role?: UserRole | undefined;
  search?: string | undefined;
}

/**
 * Requests
 */
export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUserRegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

/**
 * Responses
 */
export interface IUserAuthResponse {
  data: IUser;
  token: string;
}

export interface IUserUpdateProfileRequest {
  email: string | undefined;
  phone: string | undefined;
  name: string | undefined;
}

export interface IUserResetPasswordRequest {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}

export interface IUserVerifyEmail {
  user_id: number;
  token: string;
}

export interface IVerifyToken {
  email: string;
  type: 'email_verification' | 'password_reset';
  token: string;
}
