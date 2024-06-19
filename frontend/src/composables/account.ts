import { computed, ref } from "vue";
import { AccountAuthorized, AccountType } from "@/types/account";

const account = ref<AccountAuthorized | null>(null);

export const useAccount = () => {
  const loginAccount = (_account: AccountAuthorized) => {
    account.value = _account;
  };
  const logoutAccount = () => {
    account.value = null;
  }
  const isLoggedAccount = () => account.value !== null;
  const isAccountLearner = computed(() => account.value?.type === AccountType.LEARNER);
  const isAccountTeacher = computed(() => account.value?.type === AccountType.TEACHER);

  return {
    account,
    loginAccount,
    logoutAccount,
    isLoggedAccount,
    isAccountLearner,
    isAccountTeacher,
  };
};
