import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IdentityLogin } from '@/api';
import { STORE_KEY_USER } from '@/constants';
import router from '@/router';
import type { User } from '@/types';

export const useUserStore = defineStore(
  STORE_KEY_USER,
  () => {
    // region states
    const user = ref<User | null>(null);
    const token = ref<string | null>(null);
    const token_expires_at = ref<number | null>(null);
    // endregion

    // region actions
    const login = async (account: string, password: string) => {
      const resp = await IdentityLogin(account, password);
      const data = resp.data;

      user.value = data.user;
      token.value = data.token;
      token_expires_at.value = data.token_expires_at * 1000;
    };

    const logout = async () => {
      // TODO call api revoke token
      clear();
      router.push('/login');
    };

    const clear = () => {
      user.value = null;
      token.value = null;
      token_expires_at.value = null;
    };

    const isTokenExpired = () => {
      if (!token_expires_at.value) {
        return true;
      }

      return Date.now() > token_expires_at.value;
    };
    // endregion

    return {
      user,
      token,
      token_expires_at,
      login,
      logout,
      clear,
      isTokenExpired,
    };
  },
  {
    persist: {
      key: STORE_KEY_USER,
      storage: localStorage,
    },
  }
);
