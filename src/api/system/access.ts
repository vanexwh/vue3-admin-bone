/*
 * @Author: vanexwh@163.com
 * @Date: 2022-08-03 09:51:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-10-11 11:09:32
 * @FilePath: \twy_web_admin\src\api\system\login.ts
 * @Description: 
 */
import { http } from '/@/utils/httpRequest';

export const userLogin = (account: string, password: string) => {
	return http.request({ method: 'post', url: 'TwyAdmin/admin/sysAdminLogin' }, { account, password }, false);
};
