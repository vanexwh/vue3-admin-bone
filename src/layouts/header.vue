<script setup lang="ts" name="LayoutHeader">
import {PoweroffOutlined, SmileTwoTone} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
import {useStore} from "/@/store";
import {Local} from "/@/utils/storage";

const router = useRouter();
const store = useStore();

const onLogout = () => {
  router.push('/login');
  Local.clear();
};

</script>

<template>
  <div class="layout-header">
    <div class="layout-header-active-menu"></div>
    <div class="layout-header-user">
      <div>
        <smile-two-tone two-tone-color="#eb2f96" style="font-size: 24px;margin-right: 20px"/>
        <span>Hi, {{ store.user.info.name }}</span>
      </div>
      <poweroff-outlined style="font-size:24px;" @click="onLogout"/>
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  border-radius: 24px 0 0 0;
  border-bottom: 1px solid var(--color-info-light-9);
  background-color: var(--color-whites);
  padding: 0 16px;

  &-user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 20%;
  }
}
</style>
