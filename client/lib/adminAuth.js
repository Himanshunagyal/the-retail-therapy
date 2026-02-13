const TOKEN_KEY = 'admin_token';
const ADMIN_KEY = 'admin_data';

export const setAdminToken = (token) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAdminToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setAdminData = (admin) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
};

export const getAdminData = () => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(ADMIN_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearAdminAuth = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
};

export const isAdminAuthenticated = () => {
  return !!getAdminToken();
};