<script setup lang="ts" name="LayoutMain">
import {useRoute} from "vue-router";

const route = useRoute();
</script>

<template>
	<div class="layout-container-main">
		<div class="layout-container-main-body">
			<router-view v-slot="{ Component }">
				<!-- <transition name="fade" mode="out-in"> -->
				<keep-alive>
					<component :is="Component" :key="route.name" class="w100" />
				</keep-alive>
				<!-- </transition> -->
			</router-view>
		</div>
	</div>
</template>

<style lang="less" scoped>
.layout-container-main {
	width: 100%;
	height: calc(100vh - 36px);
	float: left;
	background-color: var(--color-whites);
	padding: 0 20px;

	&-body {
		width: 100%;
		height: calc(100% - 60px);
	}
}
</style>
