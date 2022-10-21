<!--
 * @Author: vanexwh@163.com
 * @Date: 2022-08-03 15:43:18
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-10-11 18:10:50
 * @FilePath: \twy_web_admin\src\views\login\index.vue
 * @Description: 
-->
<script setup lang="ts" name="login">
import {userLogin} from '../../api/system/access';
import {message} from 'ant-design-vue';
import {useStore} from '/@/store';
import {useRouter} from 'vue-router';

const store = useStore();
const router = useRouter();

const onLogin = async () => {
  const res: any = await userLogin('admin', '123456');
  store.user.$patch({token: res.accessToken});
  message.success('登录成功');
  await router.push('/');
};
</script>

<template>
  <div class="layout-login">
    <img class="layout-login-bg-image" src="../../assets/images/bg_login.jpg" alt="登录页">
    <div class="layout-login-panel">
      <a-button type="primary" danger shape="circle" @click="onLogin">login</a-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout-login {
  position: fixed;
  width: 100%;
  height: 100%;

  &-bg-image {
    width: 100%;
    height: 100%;
  }
  &-panel {
    position: fixed;
    top: 30%;
    right: 30%;
    width: 200px;
    height: 120px;
    border-radius: 8px;
    background-color: var(--color-whites);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
