export interface IApiWrapper<T> {
  data: T;
  message?: string;
  error?: string;
}
