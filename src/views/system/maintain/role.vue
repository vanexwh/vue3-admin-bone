<!--
 * @Author: vanexwh@163.com
 * @Date: 2022-10-11 13:19:06
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-10-12 09:08:00
 * @FilePath: \twy_web_admin\src\views\system\maintain\menu.vue
 * @Description: 
-->
<script setup lang="ts" name="roleMaintain">
	import { onMounted, reactive, toRefs } from 'vue';
	import { getSysAdminRoles, delSysAdminRole } from '/@/api/system/role';
	
	// 定义一个数据存储容器
	const state = reactive({
	  roles: [],
	  columns: [
		{ title: 'id', dataIndex: 'id', key: 'id' },
		{ title: '姓名', dataIndex: 'name', key: 'name' },
		{ title: '备注', dataIndex: 'remark', key: 'remark' },
		{ title: '创建时间', dataIndex: 'created_at', key: 'created_at' },
		{ title: '操作', key: '操作1' }
	  ]
	});
	
	// 可以理解为把容器里的东西拿出来，直接使用，不过得加上 .value
	const { roles, columns } = toRefs(state);
	
	const onShowModal = () => {
	
	};
	
	
	// 编辑  column表头信息  record行信息
	const onEdit = (column: any, record: any) => {
	  console.log('%c [ 行数据 ]-35', 'font-size:12px; background:pink; color:#bf2c9f;', record.id)
	
	  console.log('%c [ 表头数据 ]-37', 'font-size:12px; background:pink; color:#bf2c9f;', column)
	
	};
	
	// 删除
	const onDel = async (record: any) => {
	  await delSysAdminRole(record.id);
	  // 刷新 
	  // 新增、编辑、删除后都需要重新获取一下新的列表数据
	  _getSysAdminRolese();
	};
	
	
	// vue生命周期钩子函数   页面挂载时触发
	onMounted(() => {
	  // 挂载时拿取数据
	  _getSysAdminRolese();
	});
	
	// 获取管理员角色权限列表
	const _getSysAdminRolese = async () => {
	  const res: any = await getSysAdminRoles(1, 999);
	  // 拿到数据，存起来使用
	  roles.value = res.list ? res.list : [];
	};
	
	</script>
	
	<template>
	  <div class="page-role-maintain-container">
		<div class="operate">
		  <!-- 查询条件、anniu -->
		  <a-button type="primary" @click="onShowModal">新增角色</a-button>
		</div>
		<a-table :dataSource="roles" :columns="columns">
		  <template #bodyCell="{column,record}">
			<template v-if="column.key==='操作1'">
			  <a-button class="mr10" type="primary" ghost @click="onEdit(column,record)">编辑</a-button>
			  <a-popconfirm :title="`确定删除角色：${record.name}？`" ok-text="Yes" cancel-text="No" @confirm="onDel(record)">
				<a-button danger>删除</a-button>
			  </a-popconfirm>
			</template>
		  </template>
		</a-table>
	  </div>
	</template>
	
	<style scoped lang="less">
	.page-role-maintain-container {
	  width: 100%;
	  height: 100%;
	}
	</style>
