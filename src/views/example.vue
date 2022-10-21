<script setup lang="ts" name="example">
import {reactive, toRefs, watch} from "vue";
import {Form} from 'ant-design-vue';

const useForm = Form.useForm;

const state = reactive({
  text: 'I‘m a vue3 form example',
  modal: {
    visible: false,
    title: '新增人员'
  },
  form: {
    name: '',
    age: null,
    gender: null,
    phone: '' as string,
    major: [] as any,
  },
  data: [
    {name: '李华', age: 18, gender: 1, phone: '+86 15012345678', major: ['电气自动化', 'xx']},
    {name: '张东升', age: 18, gender: 1, phone: '+86 15012345678', major: ['电气自动化']},
    {name: '赵露思', age: 18, gender: 1, phone: '+86 15012345678', major: ['电气自动化']},
  ] as any,
  columns: [
    {title: '姓名', dataIndex: 'name', key: 'name'},
    {title: '年龄', dataIndex: 'age', key: 'age'},
    {title: '性别', dataIndex: 'gender', key: 'gender'},
    {title: '电话', dataIndex: 'phone', key: 'phone'},
    {title: '专业', dataIndex: 'major', key: 'major'},
  ]
});

const {text, modal, form, columns, data} = toRefs(state);

const rulesRef = reactive({
  name: [
    {required: true, message: '请输入姓名', trigger: 'change'}
  ],
  age: [
    {required: true, message: '请输入年龄', trigger: 'change'}
  ],
  gender: [
    {required: true, message: '请选择性别', trigger: 'change'}
  ],
});

const {resetFields, validate, validateInfos} = useForm(form, rulesRef);


const onShowModal = () => {
  modal.value = {
    visible: true,
    title: '新增人员'
  };
  resetFields();
};

const onSubmit = () => {
  validate().then(() => {
    data.value.push({...form.value});
    modal.value.visible = false;
  }).catch(err => {
    console.error(err)
  })
};

watch(() => data, (val) => {
  console.log('table data change', val)
});

</script>

<template>
  <div class="example-layout-header">
    <div class="item">
      <span class="label">名称：</span>
      <a-input :model="form.name" placeholder="名称"/>
    </div>
    <div class="item">
      <span class="label">电话：</span>
      <a-input :model="form.phone" placeholder="电话"/>
    </div>
    <div class="item">
      <span class="label">年龄：</span>
      <a-input :model="form.name" placeholder="年龄"/>
    </div>
    <div class="item">
      <span class="label overflow1">专业：</span>
      <a-input :model="form.phone" placeholder="专业"/>
    </div>
    <a-button class="mr20">搜索</a-button>
    <a-button type="primary" @click="onShowModal">新增</a-button>
  </div>
  <div class="example-layout-main">
    <a-table :dataSource="data" :columns="columns"/>
  </div>
  <a-modal v-model:visible="modal.visible" :title="modal.title" @ok="onSubmit">
    <a-form :label-col="{style:{width:'80px'}}" :wrapper-col="{span:18}">
      <a-form-item has-feedback label="姓名" name="name" v-bind="validateInfos.name">
        <a-input v-model:value="form.name" placeholder="请输入姓名"/>
      </a-form-item>
      <a-form-item has-feedback label="年龄" name="age" v-bind="validateInfos.age">
        <a-input v-model:value="form.age" placeholder="请输入年龄"/>
      </a-form-item>
      <a-form-item has-feedback label="性别" name="gender" v-bind="validateInfos.gender">
        <a-radio-group v-model:value="form.gender">
          <a-radio :value="1">男</a-radio>
          <a-radio :value="2">女</a-radio>
          <a-radio :value="0">未知</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item has-feedback label="电话" name="phone" v-bind="validateInfos.phone">
        <a-input v-model:value="form.phone" placeholder="请输入电话"/>
      </a-form-item>
      <a-form-item has-feedback label="专业" name="major" v-bind="validateInfos.major">
        <a-select
            v-model:value="form.major"
            mode="multiple"
            style="width: 100%"
            placeholder="请选择专业"
            :options="[...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))"
        ></a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less" scoped>
.example-layout-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 60px;
  margin: 0 auto;
  border-bottom: 1px solid var(--color-info-light-9);

  .item {
    width: 30%;
    height: 60px;
    display: flex;
    align-items: center;
    margin-right: 20px;

    .label {
      min-width: 60px;
      max-width: 120px;
    }
  }
}
</style>