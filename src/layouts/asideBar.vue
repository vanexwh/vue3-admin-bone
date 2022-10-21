<!--
 * @Author: vanexwh@163.com
 * @Date: 2022-07-26 09:17:17
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-10-11 09:14:56
 * @FilePath: \twy_web_admin\src\layout\asideBar.vue
 * @Description: 
-->
<script setup lang="ts" name="LayoutAside">
import Logo from './logo.vue';
import LayoutMenu from './menu.vue';
import LayoutFooter from './footer.vue';</script>

<template>
  <div class="layout-aside">
    <Logo/>
    <LayoutMenu class="menu"/>
    <LayoutFooter/>
  </div>
</template>

<style lang="less" scoped>
.layout-aside {
  width: 120px;
  height: 100vh;
  background-color: #eef3fe;
  box-shadow: var(--shadow);

  .menu {
    width: 100%;
    height: calc(100vh - 60px - 80px);
  }
}
</style>
