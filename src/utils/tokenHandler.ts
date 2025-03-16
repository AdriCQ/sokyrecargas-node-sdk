import { useStorage } from './localStorage';

export interface TokenHandler {
  set: (p: string) => void;
  get?: () => string | null;
  getPromise?: () => Promise<string | null>;
}

/**
 * defaultTokenHandler
 */
export function defaultTokenHandler(): TokenHandler {
  const storage = useStorage<string>('auth_token', true);

  return {
    get: () => storage.get(),
    set: (token: string) => storage.set(token),
  };
}
