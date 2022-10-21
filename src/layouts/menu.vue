<!--
 * @Author: vanexwh@163.com
 * @Date: 2022-08-04 11:02:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-10-11 17:53:29
 * @FilePath: \twy_web_admin\src\layouts\menu.vue
 * @Description: 
-->
<script setup lang="ts" name="LayoutMenu">
import { onMounted, reactive, toRefs, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { routes } from '/@/router/routes';
import { useStore } from '/@/store';

import SubMenu from './subMenu.vue';

const router = useRouter();
const route = useRoute();
const store = useStore();

const state = reactive({
  menus: routes[0].children as any,
  openKeys: ['maintain'],
  selectedKeys: ['home'] as string[]
});

const { menus, openKeys, selectedKeys } = toRefs(state);

onMounted(() => {
  console.log('当前菜单', route.name);
});

watchEffect(() => {
  selectedKeys.value = [route.path];
});

</script>

<template>
  <div class="menu-container">
    <a-menu mode="inline" :selected-keys="selectedKeys">
      <template v-for="m in menus">
        <template v-if="m.children">
          <a-menu-item-group :key="m.path" :title="m.meta?.title">
            <a-menu-item v-for="s in m.children" :key="s.path">
              <router-link :to="s.path">{{s.meta?.title}}</router-link>
            </a-menu-item>
          </a-menu-item-group>
        </template>
        <template v-else>
          <a-menu-item :key="m.path">
            <router-link :to="m.path">{{m.meta?.title}}</router-link>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<style lang="less" scoped>
.menu-container {
  width: 100%;
}
</style>
