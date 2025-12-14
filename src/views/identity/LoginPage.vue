<template>
  <default-layout>
    <n-card class="login-card">
      <n-form :model="formValues" :rules="formRules">
        <n-form-item label="账号" path="account">
          <n-input :type="'text'" v-model:value="formValues.account"/>
        </n-form-item>

        <n-form-item label="密码" path="password">
          <n-input :type="'password'" v-model:value="formValues.password"/>
        </n-form-item>

        <n-form-item>
          <n-button class="ml-auto" type="primary" @click="LoginHandler">登录</n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </default-layout>
</template>

<style lang="less" scoped>
.login-card {
  width: 384px;
  height: 512px;
  margin: auto 32px auto auto;
}
</style>

<script setup lang="ts">
import type { FormRules } from 'naive-ui';
import { NButton, NCard, NForm, NFormItem, NInput } from 'naive-ui';
import { ref } from 'vue';
import { DefaultLayout } from '@/layouts';
import router from '@/router';
import { useUserStore } from '@/stores/user.store';

const userStore = useUserStore();

const formValues = ref({
  account: '',
  password: '',
});

const formRules: FormRules = {
  account: {
    required: true,
    message: '请输入账号',
    trigger: ['blur'],
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['blur'],
  },
};

const LoginHandler = async () => {
  await userStore.login(formValues.value.account, formValues.value.password);
  router.push('/');
};
</script>
