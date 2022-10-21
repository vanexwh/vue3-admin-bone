<!--
 * @Author: ych980806@163.com
 * @Date: 2022-10-12 10:53:53
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-10-12 17:55:21
 * @FilePath: \twy_web_admin\src\views\system\maintain\menu.vue
 * @Description: 
-->
<script setup lang="ts" name="menuMaintain">
  import { onMounted, reactive, toRefs, defineComponent, ref} from 'vue';
	import { getSysAdminMenus, delSysAdminMenu, addSysAdminMenu } from '/@/api/system/menu';
  import { Form, message, UploadChangeParam } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  const useForm = Form.useForm;
  	// 定义一个数据存储容器
	const state = reactive({
    modal: {
    visible: false,
    title: '新增菜单'
    },
    fileList : ref([]),
    headers: {
        authorization: 'authorization-text',
      },
    form: {
    menu_type: null,
    name: '',
    title: '',
    path: '',
    component: '',
    redirect: '',
    sort: null,
    icon: null,
    is_hide: null,
    is_keep_alive: null,
    parent_id: null,
    interface_id: null,
    is_home: null,
    is_main: null,
    },
	  menus: [],
	  columns: [
		{ title: '菜单名称', dataIndex: 'name', key: 'name' },
		{ title: '标题', dataIndex: 'title', key: 'title' },
		{ title: '路径', dataIndex: 'path', key: 'path' },
		{ title: '本地路径', dataIndex: 'component', key: 'component' },
    { title: '跳转', dataIndex: 'redirect', key: 'redirect' },
    { title: '排序', dataIndex: 'sort', key: 'sort' },
		{ title: '操作', key: '操作' }
	  ]
	});

  // 可以理解为把容器里的东西拿出来，直接使用，不过得加上 .value
	const { modal, headers, fileList, form, menus, columns } = toRefs(state);
	
  // 
  const rulesRef = reactive({
  menu_type: [
    {required: true, message: '请选择菜单类型', trigger: 'change'}
  ],
  name: [
    {required: true, message: '请输入菜单名称', trigger: 'change'}
  ],
  title: [
    {required: true, message: '请输入菜单标题', trigger: 'change'}
  ],
  path: [
    {required: true, message: '请输入路径', trigger: 'change'}
  ],
  component: [
    {required: true, message: '请输入本地路径', trigger: 'change'}
  ],
  redirect: [
    {required: true, message: '请输入跳转路径', trigger: 'change'}
  ],
  sort: [
    {required: true, message: '请选择排序', trigger: 'change'}
  ],
});

const {resetFields, validate, validateInfos} = useForm(form, rulesRef);

  // 新增菜单
	const onShowModal = () => {
    modal.value = {
    visible: true,
    title: '新增菜单'
  };
  _getSysAdminMenuse();
	};

  // 提交新增菜单表格
  const onSubmit = () => {
  validate().then(() => {
    // data.value.push({...form.value});
    // ！！！！！！！！！！！！！！！！！！！！
    onAdd();
    modal.value.visible = false;
  }).catch(err => {
    console.error(err)
  })
};



	// 编辑  column表头信息  record行信息
	const onEdit = (column: any, record: any) => {
	  console.log('%c [ 行数据 ]-35', 'font-size:12px; background:pink; color:#bf2c9f;', record.name)
	
	  console.log('%c [ 表头数据 ]-37', 'font-size:12px; background:pink; color:#bf2c9f;', column)
	
	};

  const onAdd = async () => {
	  await addSysAdminMenu(form.value.menu_type, form.value.name, form.value.title,form.value.path, form.value.component, form.value.redirect, form.value.sort, form.value.icon, form.value.is_hide, form.value.is_keep_alive, form.value.parent_id, form.value.interface_id, form.value.is_home, form.value.is_main);
	  // 刷新 
	  // 新增、编辑、删除后都需要重新获取一下新的列表数据
	  _getSysAdminMenuse();
	};

  	// 删除
	const onDel = async (record: any) => {
	  await delSysAdminMenu(record.id);
	  // 刷新 
	  // 新增、编辑、删除后都需要重新获取一下新的列表数据
	  _getSysAdminMenuse();
	};

  // vue生命周期钩子函数   页面挂载时触发
	onMounted(() => {
	  // 挂载时拿取数据
	  _getSysAdminMenuse();
	});

  // 获取管理员角色权限列表
	const _getSysAdminMenuse = async () => {
	  const res: any = await getSysAdminMenus(1, 999);
	  // 拿到数据，存起来使用
	  menus.value = res.list ? res.list : [];
	};

  const handleChange = (info: UploadChangeParam) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
 
  </script>
  
  <template>
    <div class="page-role-maintain-container">
		<div class="operate">
		  <!-- 查询条件、anniu -->
		  <a-button type="primary" @click="onShowModal">新增菜单</a-button>
		</div>
		<a-table :dataSource="menus" :columns="columns">
		  <template #bodyCell="{column,record}">
			<template v-if="column.key==='操作'">
			  <a-button class="mr10" type="primary" ghost @click="onEdit(column,record)">编辑</a-button>
			  <a-popconfirm :title="`确定删除菜单：${record.name}？`" ok-text="Yes" cancel-text="No" @confirm="onDel(record)">
				<a-button danger>删除</a-button>
			  </a-popconfirm>
			</template>
		  </template>
		</a-table>
	  </div>

    <a-modal v-model:visible="modal.visible" :title="modal.title" @ok="onSubmit">
    <a-form :label-col="{style:{width:'80px'}}" :wrapper-col="{span:18}">
      <a-form-item has-feedback label="菜单类型" name="menu_type" v-bind="validateInfos.menu_type">
        <a-radio-group v-model:value="form.menu_type">
          <a-radio :value="1">目录</a-radio>
          <a-radio :value="2">菜单</a-radio>
          <a-radio :value="0">按钮</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item has-feedback label="菜单名称" name="name" v-bind="validateInfos.name">
        <a-input v-model:value="form.name" placeholder="请输入菜单名称"/>
      </a-form-item>
      <a-form-item has-feedback label="标题" name="title" v-bind="validateInfos.title">
        <a-input v-model:value="form.title" placeholder="请输入菜单标题"/>
      </a-form-item>
      <a-form-item has-feedback label="路径" name="path" v-bind="validateInfos.path">
        <a-input v-model:value="form.path" placeholder="请输入路径"/>
      </a-form-item>
      <a-form-item has-feedback label="本地路径" name="component" v-bind="validateInfos.component">
        <a-input v-model:value="form.component" placeholder="请输入本地路径"/>
      </a-form-item>
      <a-form-item has-feedback label="跳转路径" name="redirect" v-bind="validateInfos.redirect">
        <a-input v-model:value="form.redirect" placeholder="请输入跳转路径"/>
      </a-form-item>
      <a-form-item has-feedback label="菜单排序" name="sort" v-bind="validateInfos.sort">
        <a-input-number id="inputNumber" v-model:value="form.sort" :min="1" :max="10" />
      </a-form-item>
      <a-form-item has-feedback label="菜单图标" name="icon" v-bind="validateInfos.icon">
        <a-upload
          v-model:file-list="form.icon"
          name="icon"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Click to Upload
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item has-feedback label="是否隐藏" name="is_hide" v-bind="validateInfos.is_hide">
        <a-radio-group v-model:value="form.is_hide">
          <a-radio :value="0">隐藏</a-radio>
          <a-radio :value="1">显示</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item has-feedback label="是否缓存" name="is_keep_alive" v-bind="validateInfos.is_keep_alive">
        <a-radio-group v-model:value="form.is_keep_alive">
          <a-radio :value="0">缓存</a-radio>
          <a-radio :value="1">不缓存</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item has-feedback label="父级菜单" name="parent_id" v-bind="validateInfos.parent_id">
        <a-select
            v-model:value="form.parent_id"
            style="width: 100%"
            placeholder="请选择父级菜单"
            :options="[...Array(10)].map((_, i) => ({ value: (i + 1) }))"
        ></a-select>
      </a-form-item>
      <a-form-item has-feedback label="接口ID" name="interface_id" v-bind="validateInfos.interface_id">
        <a-select
            v-model:value="form.interface_id"
            style="width: 100%"
            placeholder="请选择接口ID"
            :options="[...Array(10)].map((_, i) => ({ value: (i + 1) }))"
        ></a-select>
      </a-form-item>
      <a-form-item has-feedback label="是否首页" name="is_home" v-bind="validateInfos.is_home">
        <a-radio-group v-model:value="form.is_home">
          <a-radio :value="0">是</a-radio>
          <a-radio :value="1">否</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item has-feedback label="是否主菜单" name="is_main" v-bind="validateInfos.is_main">
        <a-radio-group v-model:value="form.is_main">
          <a-radio :value="0">是</a-radio>
          <a-radio :value="1">否</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
  </template>
  
  <style lang="less" scoped>
    .page-role-maintain-container {
	  width: 100%;
	  height: 100%;
	}
  </style>
  