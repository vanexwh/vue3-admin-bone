<script setup lang="ts" name="layout">
import LayoutHeader from './header.vue';
import LayoutAside from './asideBar.vue';
import LayoutMain from './main.vue';</script>

<template>
  <div class="layout">
    <LayoutAside/>
    <div class="layout-content">
      <LayoutHeader/>
      <LayoutMain/>
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout {
  display: flex;
  width: 100%;
  height: 100%;

  .layout-content {
    width: 100%;
    background-color: #eef3fe;
  }
}
</style>
