import { GlobalState, useGlobalState } from './GlobalState';

const DOMAIN_KEY = process.env.REACT_APP_LOGIFY_DOMAINKEY;
const NOT_AUTH_DATA = { user: {}, access: {} };

let logifyAuthGlobalStateData = new GlobalState(
  JSON.parse(localStorage.getItem('logifyAuthData')) || NOT_AUTH_DATA
);

const setLogifyAuthGlobalStateData = (data) => {
  logifyAuthGlobalStateData.setValue(data);
  localStorage.setItem('logifyAuthData', JSON.stringify(data));
};

const onLoginMessage = (event) => {
  if (event.origin !== 'https://logify.id') return;
  if (event.data.user) {
    setLogifyAuthGlobalStateData(event.data);
  }
};

window.addEventListener('message', onLoginMessage, false);

export const useLogify = () => {
  const [logifyData] = useGlobalState(logifyAuthGlobalStateData);

  const auth = {
    onLogin: () => {
      window.open(
        `https://logify.pw/login?dk=${DOMAIN_KEY}&platform=jj`,
        'authWindow'
      );
    },
    onLogout: () => {
      setLogifyAuthGlobalStateData(NOT_AUTH_DATA);
    },
    hasAccess: (appVersionId, path) => {
      if (!logifyData.user.id) return undefined;
      try {
        return (
          path
            .split('.')
            .reduce((o, i) => o[i], logifyData.access[appVersionId]) || false
        );
      } catch (e) {}
    },
  };

  return { ...logifyData, ...auth };
};
