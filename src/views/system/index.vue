<!--
 * @Author: vanexwh@163.com
 * @Date: 2022-08-03 16:59:53
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-10-11 17:24:52
 * @FilePath: \twy_web_admin\src\views\system\index.vue
 * @Description: 
-->
<script setup lang="ts" name="system">
import {useRoute} from "vue-router";

const route = useRoute();
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" :key="route.path" />
  </router-view>
</template>

<style lang="less" scoped></style>
