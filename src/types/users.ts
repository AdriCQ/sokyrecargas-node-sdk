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

export interface IUserUpdateRequest {
  name?: string | undefined;
  verify_phone?: boolean | undefined;
  verify_email?: boolean | undefined;
  password?: string | undefined;
  password_confirmation?: string | undefined;
  coins?: number | undefined;
}
