/*
 * @Author: vanexwh@163.com
 * @Date: 2022-07-26 09:14:44
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-10-11 17:54:02
 * @FilePath: \twy_web_admin\src\router\index.ts
 * @Description: 
 */
import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from '/@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Local } from '/@/utils/storage';
import { message } from 'ant-design-vue';
import { routes } from './routes';

let getDynamicRoutes = true;

export const router = createRouter({
	history: createWebHistory(),
	routes,
});

// 路由守卫
// 加载前
router.beforeEach(async (to, form, next) => {
	NProgress.start();
	const store = useStore();
	const token = store.user.getToken;

	if (!token) {
		if (to.path !== '/login') {
			message.warn('请登录!');
			Local.clear();
			next('/login');
		} else {
			next();
		}
	} else {
		addRoutes();
		if (getDynamicRoutes) {
			// 加载动态路由
			next({ ...to, replace: true });
			getDynamicRoutes = false;
		} else {
			next();
		}
	}
});

//加载后
router.afterEach(async () => {
	NProgress.done();
});

// 添加动态路由
const addRoutes = () => {
	
	console.log('%c [ 加载动态路由... ]-59', 'font-size:12px; background:pink; color:#bf2c9f;', )
};
