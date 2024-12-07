import * as axios from 'axios';
import { InternalAxiosRequestConfig, AxiosResponse, AxiosInterceptorOptions, AxiosInstance } from 'axios';

/**
 * @interface IPaginatedData
 */
interface IPaginatedData<T> {
    data: T[];
    links: {
        first?: string;
        last?: string;
        prev?: string;
        next?: string;
    };
    meta: {
        current_page?: number;
        from?: number;
        path?: string;
        per_page?: number;
        to?: number;
    };
}
/**
 * @interface IPaginationParams
 */
interface IPaginationParams {
    page?: number;
    paginate?: number;
}

/**
 * User
 */
interface IUser {
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
declare enum UserRole {
    ADMIN = "admin",
    GUEST = "guest"
}
interface IUserFilterRequest extends IPaginationParams {
    email?: string;
    name?: string;
    phone?: string;
    role?: UserRole;
}
/**
 * Requests
 */
interface IUserLoginRequest {
    email: string;
    password: string;
}
interface IUserRegisterRequest {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
}
/**
 * Responses
 */
interface IUserAuthResponse {
    data: IUser;
    token: string;
}
interface IUserUpdateRequest {
    name?: string;
    verify_phone?: boolean;
    verify_email?: boolean;
    password?: string;
    password_confirmation?: string;
    coins?: number;
}

interface IUserStats {
    transactions: number;
    credits: number;
    recharges: number;
}

interface ISiteBanner {
    id: number;
    title: string;
    image: string;
    link?: string;
    description: string;
    active: boolean;
}
interface ISiteBannerCreate extends Omit<ISiteBanner, 'id' | 'image'> {
    image: File;
}
type ISiteBannerUpdate = Partial<ISiteBannerCreate>;

interface IOperator {
    id: number;
    code: string;
    name: string;
    available: boolean;
    image: null | string;
}
interface IOperatorCreate {
    code: string;
    name: string;
    available: boolean;
    image: null | File;
}
type IOperatorUpdate = Partial<IOperatorCreate>;

interface IRecharge {
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
interface IRechargeFilterRequest extends IPaginationParams {
    operator_id?: number;
    user_id?: number;
    status?: RechargeStatus;
    recipient?: string;
}
declare enum RechargeStatus {
    CANCELED = "canceled",
    COMPLETED = "completed",
    PENDING = "pending"
}
interface IRechargeCreate {
    amount: number;
    operator_code: string;
    recipient: string;
    recipient_name: string | null;
}
interface IRechargeUpdateRequest {
    status?: RechargeStatus.CANCELED;
    recipient?: string;
    recipient_name?: string;
}

interface ICategory {
    id: number;
    name: string;
}
interface ICategoryCreateRequest {
    name: string;
    parent_id?: number;
}
type ICategoryUpdateRequest = Partial<ICategoryCreateRequest>;

interface IOffer {
    id: number;
    name: string;
    image: string | null;
    image_promo: string | null;
    description: string | null;
    prices: IOfferPrice[];
    available?: boolean;
    category: ICategory | null;
    operator: IOperator;
    start_date: null | string | Date;
    end_date: null | string | Date;
}
interface IOfferCreateRequest extends Omit<IOffer, 'id' | 'image' | 'image_promo' | 'category' | 'operator'> {
    category_id?: number;
    operator_code: string;
    image?: File;
    image_promo?: File;
    start_date: null | string;
    end_date: null | string;
}
type IOfferUpdateRequest = Partial<IOfferCreateRequest>;
interface IOfferFilterRequest extends IPaginationParams {
    operator_code?: string;
    search?: string;
    available?: string;
    category_id?: number;
    start_date?: null | string;
    end_date?: null | string;
    for_customer?: boolean;
}
type IOfferPrice = {
    id?: string;
    label: string;
    value: number;
    value_private?: number;
};
interface IOfferRecharge {
    recipient: string;
    price_id: string;
}

interface ICurrency {
    id: number;
    name: string;
    code: string;
    rate: number;
    image: string;
}
type ICurrencyCreate = Omit<ICurrency, 'id' | 'code'>;
type ICurrencyUpdate = Partial<ICurrencyCreate>;

declare enum CoinTransactionStatus {
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed"
}
declare enum CoinTransactionType {
    WITHDRAWAL = "withdrawal",
    DEPOSIT = "deposit",
    TRANSFER = "transfer",
    REFUND = "refund",
    CONSUME = "consume"
}
interface ICoinTransaction {
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
interface ICoinTransferenceRequest {
    to_user_email: string;
    amount: number;
    comment?: string;
}
type ICoinTopUpRequest = {
    amount: number;
    user_id?: number;
    currency: number;
    completed?: boolean;
};
interface ICoinTransactionFilterRequest extends IPaginationParams {
    from_user_id?: number;
    to_user_id?: number;
    status?: CoinTransactionStatus;
}

interface IApiWrapper<T> {
    data: T;
    message?: string;
    error?: string;
}

interface IApp {
    id: number;
    name: string;
    image: string | null;
    url: string | null;
    available: boolean;
    user?: IUser;
    meta: IAppMeta[] | null;
}
type IAppMeta = {
    key: string;
    value: string;
};
interface IAppCreateRequest {
    name: string;
    image: string | null;
    url: string | null;
    available: boolean;
    user_email: string;
    meta: IAppMeta[] | null;
}
type IAppUpdateRequest = Partial<Omit<IAppCreateRequest, 'user_email'>>;

interface TokenHandler {
    set: (p: string) => void;
    get?: () => string | null;
    getPromise?: () => Promise<string | null>;
}
/**
 * defaultTokenHandler
 */
declare function defaultTokenHandler(): TokenHandler;

/**
 * useErrorHandler
 * @param params
 * @returns
 */
declare function useErrorHandler(params: ErrorHandlerParams): InterceptorUse;
/**
 * headersInterceptor
 * @param params
 * @returns
 */
declare function useHeadersInterceptor(params: {
    appToken: string;
    tokenHandler: TokenHandler;
}): InterceptorUse<InternalAxiosRequestConfig<any>>;
interface ErrorHandlerParams {
    defaultError?: {
        unauthorized: string;
    };
    logout: () => void;
    handleError: (error: string) => void;
}
interface InterceptorUse<V = AxiosResponse<any, any>> {
    onFulfilled?: ((value: V) => V | Promise<V>) | null;
    onRejected?: ((error: any) => any) | null;
    options?: AxiosInterceptorOptions;
}

/**
 * initApi
 */
declare function initApi(params: InitApiParams): axios.AxiosInstance;
interface InitApiParams {
    appToken: string;
    baseURL: string;
    errorHandler?: ErrorHandlerParams;
    tokenHandler?: TokenHandler;
}

declare function setup(_api?: AxiosInstance): {
    api: AxiosInstance;
    app: {
        current: () => Promise<axios.AxiosResponse<IApiWrapper<IApp>, any>>;
        notify: (id: number) => Promise<axios.AxiosResponse<IApiWrapper<IApp>, any>>;
        list: (params?: undefined) => Promise<axios.AxiosResponse<IApiWrapper<IApp[]>, any>>;
        show: (id: number | string) => Promise<axios.AxiosResponse<IApiWrapper<IApp>, any>>;
        create: (params: IAppCreateRequest) => Promise<axios.AxiosResponse<IApiWrapper<IApp>, any>>;
        update: (id: number | string, params: Partial<Omit<IAppCreateRequest, "user_email">>) => Promise<axios.AxiosResponse<IApiWrapper<IApp>, any>>;
        remove: (id: number) => Promise<axios.AxiosResponse<any, any>>;
    };
    category: {
        list: (params?: undefined) => Promise<axios.AxiosResponse<IApiWrapper<ICategory[]>, any>>;
        show: (id: number | string) => Promise<axios.AxiosResponse<IApiWrapper<ICategory>, any>>;
        create: (params: ICategoryCreateRequest) => Promise<axios.AxiosResponse<IApiWrapper<ICategory>, any>>;
        update: (id: number | string, params: Partial<ICategoryCreateRequest>) => Promise<axios.AxiosResponse<IApiWrapper<ICategory>, any>>;
        remove: (id: number) => Promise<axios.AxiosResponse<any, any>>;
    };
    coin: {
        list: (params?: ICoinTransactionFilterRequest) => Promise<axios.AxiosResponse<IPaginatedData<ICoinTransaction>, any>>;
        mine: (params?: IPaginationParams) => Promise<axios.AxiosResponse<IPaginatedData<ICoinTransaction>, any>>;
        topUp: (params: ICoinTopUpRequest) => Promise<axios.AxiosResponse<IApiWrapper<ICoinTransaction>, any>>;
        transference: (params: ICoinTransferenceRequest) => Promise<axios.AxiosResponse<IApiWrapper<ICoinTransaction>, any>>;
        show: (id: number) => Promise<axios.AxiosResponse<IApiWrapper<ICoinTransaction>, any>>;
        complete: (id: number) => Promise<axios.AxiosResponse<IApiWrapper<ICoinTransaction>, any>>;
    };
    currency: {
        list: (params?: undefined) => Promise<axios.AxiosResponse<IApiWrapper<ICurrency[]>, any>>;
        show: (id: number | string) => Promise<axios.AxiosResponse<IApiWrapper<ICurrency>, any>>;
        create: (params: ICurrencyCreate) => Promise<axios.AxiosResponse<IApiWrapper<ICurrency>, any>>;
        update: (id: number | string, params: Partial<ICurrencyCreate>) => Promise<axios.AxiosResponse<IApiWrapper<ICurrency>, any>>;
        remove: (id: number) => Promise<axios.AxiosResponse<any, any>>;
    };
    offer: {
        filterAdmin: (params: IOfferFilterRequest) => Promise<axios.AxiosResponse<IApiWrapper<IOffer[]>, any>>;
        recharge: (offerId: number, params: IOfferRecharge) => Promise<axios.AxiosResponse<IApiWrapper<IRecharge>, any>>;
        rechargeStacked: (offerId: number, params: IOfferRecharge) => Promise<axios.AxiosResponse<IApiWrapper<IRecharge>, any>>;
        list: (params?: IOfferFilterRequest | undefined) => Promise<axios.AxiosResponse<IApiWrapper<IOffer[]>, any>>;
        show: (id: number | string) => Promise<axios.AxiosResponse<IApiWrapper<IOffer>, any>>;
        create: (params: IOfferCreateRequest) => Promise<axios.AxiosResponse<IApiWrapper<IOffer>, any>>;
        update: (id: number | string, params: Partial<IOfferCreateRequest>) => Promise<axios.AxiosResponse<IApiWrapper<IOffer>, any>>;
        remove: (id: number) => Promise<axios.AxiosResponse<any, any>>;
    };
    operator: {
        list: (params?: undefined) => Promise<axios.AxiosResponse<IApiWrapper<IOperator[]>, any>>;
        show: (id: number | string) => Promise<axios.AxiosResponse<IApiWrapper<IOperator>, any>>;
        create: (params: IOperatorCreate) => Promise<axios.AxiosResponse<IApiWrapper<IOperator>, any>>;
        update: (id: number | string, params: Partial<IOperatorCreate>) => Promise<axios.AxiosResponse<IApiWrapper<IOperator>, any>>;
        remove: (id: number) => Promise<axios.AxiosResponse<any, any>>;
    };
    recharge: {
        list: (params?: IRechargeFilterRequest) => Promise<axios.AxiosResponse<IPaginatedData<IRecharge>, any>>;
        store: (params: IRechargeCreate) => Promise<axios.AxiosResponse<IApiWrapper<IRecharge>, any>>;
        mine: (params?: IPaginationParams) => Promise<axios.AxiosResponse<IPaginatedData<IRecharge>, any>>;
        show: (id: number) => Promise<axios.AxiosResponse<IApiWrapper<IRecharge>, any>>;
        update: (id: number, param: IRechargeUpdateRequest) => Promise<axios.AxiosResponse<IApiWrapper<IRecharge>, any>>;
    };
    settings: {
        banners: {
            list: () => Promise<axios.AxiosResponse<IApiWrapper<ISiteBanner[]>, any>>;
            create: (params: ISiteBannerCreate) => Promise<axios.AxiosResponse<IApiWrapper<ISiteBanner>, any>>;
            update: (id: number, params: ISiteBannerUpdate) => Promise<axios.AxiosResponse<IApiWrapper<ISiteBanner>, any>>;
        };
    };
    stats: {
        mine: () => Promise<axios.AxiosResponse<IApiWrapper<IUserStats>, any>>;
    };
    user: {
        auth: {
            current: () => Promise<axios.AxiosResponse<IUserAuthResponse, any>>;
            login: (params: IUserLoginRequest) => Promise<axios.AxiosResponse<IUserAuthResponse, any>>;
            logout: () => Promise<axios.AxiosResponse<any, any>>;
            register: (params: IUserRegisterRequest) => Promise<axios.AxiosResponse<IUserAuthResponse, any>>;
        };
        list: (params?: IUserFilterRequest) => Promise<axios.AxiosResponse<IPaginatedData<IUser>, any>>;
        show: (id: number) => Promise<axios.AxiosResponse<IApiWrapper<IUser>, any>>;
        update: (id: number, params: IUserUpdateRequest) => Promise<axios.AxiosResponse<IApiWrapper<IUser>, any>>;
    };
};

export { CoinTransactionStatus, CoinTransactionType, type ErrorHandlerParams, type IApiWrapper, type IApp, type IAppCreateRequest, type IAppUpdateRequest, type ICategory, type ICategoryCreateRequest, type ICategoryUpdateRequest, type ICoinTopUpRequest, type ICoinTransaction, type ICoinTransactionFilterRequest, type ICoinTransferenceRequest, type ICurrency, type ICurrencyCreate, type ICurrencyUpdate, type IOffer, type IOfferCreateRequest, type IOfferFilterRequest, type IOfferPrice, type IOfferRecharge, type IOfferUpdateRequest, type IOperator, type IOperatorCreate, type IOperatorUpdate, type IPaginatedData, type IPaginationParams, type IRecharge, type IRechargeCreate, type IRechargeFilterRequest, type IRechargeUpdateRequest, type ISiteBanner, type ISiteBannerCreate, type ISiteBannerUpdate, type IUser, type IUserAuthResponse, type IUserFilterRequest, type IUserLoginRequest, type IUserRegisterRequest, type IUserStats, type IUserUpdateRequest, type InitApiParams, RechargeStatus, type TokenHandler, UserRole, setup as default, defaultTokenHandler, initApi, useErrorHandler, useHeadersInterceptor };
