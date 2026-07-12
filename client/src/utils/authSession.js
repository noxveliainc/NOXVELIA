const TOKEN_KEY = '@App:token';
const USER_KEY = '@App:user';

export const clearLegacyAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getAuthToken = () => sessionStorage.getItem(TOKEN_KEY);

export const getStoredUser = () => {
  try {
    const value = sessionStorage.getItem(USER_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export const storeAuth = (token, user) => {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  clearLegacyAuth();
};

export const storeUser = (user) => sessionStorage.setItem(USER_KEY, JSON.stringify(user));

export const clearAuth = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  clearLegacyAuth();
};
