<script setup lang="ts" name="svgIcon">
import './symbol';
import { defineProps, withDefaults } from 'vue';

const props = withDefaults(
	defineProps<{
		icon: string; //icon 参考图标库项目内 symbol
		size?: number;
	}>(),
	{
		icon: '',
		size: 32,
	}
);
</script>

<template>
	<svg class="icon" :style="{ width: props.size + 'px', height: props.size + 'px' }" aria-hidden="true" aria-label="ddd">
		<!-- iconfont -->
		<!-- <use :xlink:href="`#icon-${props.icon}`" /> -->
		<!-- icon-park -->
		<use :href="`#${props.icon}`" />
	</svg>
</template>

<style lang="scss" scoped>
.icon {
	fill: currentColor;
	overflow: hidden;
	cursor: pointer;
}
</style>
