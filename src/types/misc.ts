export interface IApiWrapper<T> {
  data: T;
  message?: string | undefined;
  error?: string | undefined;
}
