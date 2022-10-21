<!--
 * @Author: vanexwh@163.com
 * @Date: 2022-07-26 09:08:22
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-10-11 17:54:33
 * @FilePath: \twy_web_admin\src\App.vue
 * @Description: 
-->
<script setup lang="ts">
import { watch } from 'vue';
import { useStore } from '/@/store';
import { useRoute } from "vue-router";

import locale from 'ant-design-vue/es/locale/zh_CN';

const store: any = useStore();
const route = useRoute();

watch(() => route.path, (path) => {
  if (path) {
    document.title = route.meta?.title + ' - 泰无忧中后台管理系统';
  }
}, {
  deep: true
})
</script>

<template>
  <a-config-provider :locale="locale">
    <a-spin :delay="100" :spinning="store.config.getLoading">
      <router-view v-slot="{ Component }">
        <component :is="Component" :key="route.path" class="w100" />
      </router-view>
    </a-spin>
  </a-config-provider>
</template>

<style lang="less" scoped>

</style>
