import { useRouter } from "vue-router";
import { useAccount } from "@/composables/account";

const router = useRouter();
const { isLoggedAccount, isAccountLearner, isAccountTeacher } = useAccount();

const redirectIfNotTeacher = async (redirectPath: string) => {
  if (!isLoggedAccount() || !isAccountTeacher) {
    await router.push(redirectPath);
    return true;
  }

  return false;
};

const redirectIfNotLearner = async (redirectPath: string) => {
  if (!isLoggedAccount() || !isAccountLearner) {
    await router.push(redirectPath);
    return true;
  }

  return false;
};

export const useRedirect = () => ({
  redirectIfNotLearner,
  redirectIfNotTeacher,
});
