import {ref} from "vue";
import {AccountAuthorized} from "@/types/account";

const account = ref<AccountAuthorized | null>(null);

export const useAccount = () => {
  const loginAccount = (_account: AccountAuthorized) => {
    account.value = _account;
  };
  const logoutAccount = () => {
    account.value = null;
  }
  const isLoggedAccount = () => account.value !== null;

  return {
    account,
    loginAccount,
    logoutAccount,
    isLoggedAccount,
  };
};
