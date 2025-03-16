import sokyApi, {
  ICurrency,
  initApi,
  IOffer,
  IOfferFilterRequest,
  IUserAuthResponse,
  IUserLoginRequest,
  IUserRegisterRequest,
} from './main';

function useService() {
  // define base url
  const baseURL = 'BASE_URL';

  // Error handler
  const api = initApi({
    appToken: '',
    baseURL,
    errorHandler: {
      /**
       * Esta funcion se ejecuta cuando la API devuelve 401
       */
      logout: () => {
        console.log('logout');
      },
      /**
       * Esta funcion se ejecuta cuando la API devuelve un error 4xx o 5xx
       * @param error
       */
      handleError: (error) => {
        alert(error);
        console.log({ error });
      },
      // Conjunto de errores por defecto (opcional)
      defaultError: {
        // Error a mostrar si hay ERROR 401
        unauthorized: 'No tiene permisos suficientes',
      },
    },

    // Controlador del TOKEN de AUTHENTICATION
    tokenHandler: {
      // Obtener el token (Se ejecuta en cada pedido que necesite authentication)
      get: () => {
        return localStorage.getItem('authToken');
      },
      // Establecer token
      set: (token) => {
        localStorage.setItem('authToken', token);
      },
    },
  });

  // Devuelve la instancia de marketplace
  return sokyApi(api);
}

/**
 * Usage
 */

const { user, category, offer, coin, settings, currency } = useService();

/**
 * Example Users Auth
 */

/**
 * authLogin
 * @param params
 */
async function authLogin(
  params: IUserLoginRequest,
): Promise<IUserAuthResponse> {
  const { status, data } = await user.login(params);
  return data;
}

/**
 * authRegister
 * @param params
 */
async function authRegister(
  params: IUserRegisterRequest,
): Promise<IUserAuthResponse> {
  const { status, data } = await user.register(params);
  return data;
}

/**
 * Example Offers
 */

async function listOffers(filter: IOfferFilterRequest): Promise<IOffer[]> {
  const { status, data } = await offer.list(filter);
  // Offers are paginated
  return data.data;
}

/**
 * Example currencies
 */

async function listCurrencies(): Promise<ICurrency[]> {
  const { data, status } = await currency.list();
  return data;
}
