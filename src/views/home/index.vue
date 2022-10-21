<!--
 * @Author: vanexwh@163.com
 * @Date: 2022-08-03 16:01:06
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-10-11 17:48:29
 * @FilePath: \twy_web_admin\src\views\home\index.vue
 * @Description: 
-->
<script setup lang="ts" name="home">
import { useStore } from '/@/store';

const store = useStore();

const onModified = () => {
	store.user.$patch({ info: { name: Math.random()*100+'' } });
	
};
</script>

<template>
	<div>
		<p>home</p>
		<a-button type="primary" @click="onModified">modify user name</a-button>
		<p>{{ store.user.info.name }}</p>
	</div>
</template>

<style lang="less" scoped></style>
