export const routes = [
	{
		path: '/',
		name: 'layout',
		component: () => import('/@/layouts/index.vue'),
		redirect: '/home',
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('/@/views/home/index.vue'),
				meta: {
					title: '首页',
				},
			},
			{
				path: '/maintain',
				name: 'maintain',
				component: () => import('/@/views/system/index.vue'),
				meta: {
					title: '数据管理',
				},
				redirect: '/maintain/role',
				children: [
					{
						path: '/maintain/role',
						name: 'role',
						component: () => import('/@/views/system/maintain/role.vue'),
						meta: {
							title: '角色维护',
						},
					},
					{
						path: '/maintain/menu',
						name: 'menu',
						component: () => import('../views/system/maintain/menu.vue'),
						meta: {
							title: '菜单维护',
						},
					},
					{
						path: '/maintain/staff',
						name: 'staff',
						component: () => import('/@/views/system/maintain/staff.vue'),
						meta: {
							title: '人员维护',
						},
					},
				],
			},
			{
				path: '/example',
				name: 'example',
				component: () => import('/@/views/example.vue'),
				meta: {
					title: '表单模板',
				},
			},
			{
				path: '/temp',
				name: 'temp',
				component: () => import('/@/views/temp.vue'),
				meta: {
					title: '瓢',
				},
			},
		],
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
];
