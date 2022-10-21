/*
 * @Author: vanexwh@163.com
 * @Date: 2022-10-11 14:15:18
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-10-12 09:05:31
 * @FilePath: \twy_web_admin\src\api\system\role.ts
 * @Description:
 */
import { http } from '/@/utils/httpRequest';

// 添加管理员角色菜单权限
export const addSysAdminRole = (name: string, remark: string, menu_ids: number[], interface_ids: number[]) => {
	return http.request({ method: 'post', url: 'TwyAdmin/admin/sysAdminRole' }, { name, remark, menu_ids, interface_ids });
};

// 获取管理员角色列表
export const getSysAdminRoles = (current: number, page_size: number, name?: string, remark?: string) => {
	return http.request({ method: 'get', url: 'TwyAdmin/admin/sysAdminRole' }, { current, page_size, name, remark });
};

// 更新管理员角色权限
export const updateSysAdminRole = (id: number, name: string, remark: string, menu_ids: number[], interface_ids: number[]) => {
	return http.request({ method: 'put', url: 'TwyAdmin/admin/sysAdminRole' }, { id, name, remark, menu_ids, interface_ids });
};

// 获取管理员角色信息
export const getSysAdminRoleInfo = (id: string) => {
	return http.request({ method: 'get', url: 'TwyAdmin/admin/sysAdminRoleInfo' }, { id });
};

// 删除管理员角色信息
export const delSysAdminRole = (id: string) => {
	return http.request({ method: 'delete', url: `TwyAdmin/admin/sysAdminRole/${id}` }, {}, true, true, '删除成功');
};
