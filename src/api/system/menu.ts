/*
 * @Author: ych980806@163.com
 * @Date: 2022-10-12 9:49:10
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-10-12 09:05:31
 * @FilePath: \twy_web_admin\src\api\system\menu.ts
 * @Description:
 */
import { http } from '/@/utils/httpRequest';

// 添加菜单
export const addSysAdminMenu = (menu_type:number | null, name: string, title: string, path: string, component: string, redirect: string, sort: number | null, icon: string | null, is_hide: number | null, is_keep_alive: number | null, parent_id: number | null, interface_id: number | null, is_home: number | null, is_main: number | null) => {
    return http.request({ method: 'post', url: 'TwyAdmin/admin/sysAdminMenu' }, { menu_type, name, title, path, component, redirect, sort, icon, is_hide, is_keep_alive, parent_id, interface_id, is_home, is_main });
};
// 删除菜单信息
export const delSysAdminMenu = (id: string) => {
    return http.request({ method: 'delete', url: `TwyAdmin/admin/sysAdminMenu/${id}` }, {}, true, true, '删除成功');
};
// 获取菜单列表
export const getSysAdminMenus = (current: number, page_size: number, menu_type?: number, name?: string, title?: string, path?: string, component?: string, redirect?: string, sort?: number, icon?: string, is_hide?: number, is_keep_alive?: number, parent_id?: number, interface_id?: number, is_home?: number, is_main?: number) => {
    return http.request({ method: 'get', url: 'TwyAdmin/admin/sysAdminMenu' }, { current, page_size, menu_type, name, title, path, component, redirect, sort, icon, is_hide, is_keep_alive, parent_id, interface_id, is_home, is_main });
};
// 更新菜单
export const updateSysAdminMenu = (id: number, menu_type: number, name: string, title: string, path: string, component: string, redirect: string, sort: number, icon: string, is_hide: number, is_keep_alive: number, parent_id: number, interface_id: number, is_home: number, is_main: number) => {
    return http.request({ method: 'put', url: 'TwyAdmin/admin/sysAdminMenu' }, { id, name, title, path, component, redirect, sort, icon, is_hide, is_keep_alive, parent_id, interface_id, is_home, is_main });
};