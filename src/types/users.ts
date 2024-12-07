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
  email?: string;
  name?: string;
  phone?: string;
  role?: UserRole;
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
  name?: string;
  verify_phone?: boolean;
  verify_email?: boolean;
  password?: string;
  password_confirmation?: string;
  coins?: number;
}
