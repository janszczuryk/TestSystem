import {Account} from "@/types/account";

export const JWT_TOKEN_KEY = 'jwtToken';
export const ACCOUNT_KEY = 'account';

export const setAuthToken = (token: string): void => localStorage.setItem(JWT_TOKEN_KEY, token);
export const getAuthToken = (): string | null => localStorage.getItem(JWT_TOKEN_KEY);
export const removeAuthToken = (): void => localStorage.removeItem(JWT_TOKEN_KEY);

export const setAccount = (account: Account): void => {
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
};
export const getAccount = (): Account | null => {
  const account = localStorage.getItem(ACCOUNT_KEY);
  return account ? JSON.parse(account) : null;
};
export const removeAccount = (): void => {
  localStorage.removeItem(ACCOUNT_KEY);
};
