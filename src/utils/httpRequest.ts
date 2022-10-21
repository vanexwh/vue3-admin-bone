import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as _ from 'lodash';
import { useStore } from '/@/store';
import { notification, message } from 'ant-design-vue';
import { url } from 'inspector';

class HTTP_REQUEST {
	private readonly BASE_URL: string;
	Config: any;

	constructor() {
		this.BASE_URL = import.meta.env.VITE_API_URL as string;
		this.Config = {
			baseURL: this.BASE_URL,
			timeout: 1000 * 10,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		};
	}

	// 拦截器
	interceptors(instance: AxiosInstance, data: Object, mustToken: boolean, showMsg: boolean, resMsg?: string) {
		const store = useStore();

		// request
		instance.interceptors.request.use(
			(config) => {
				store.config.setLoading();
				// 是否有token
				if (mustToken) {
					this.Config.headers['Authorization'] = `Bearer ${store.user.getToken}`;
				}
				config.data = _.clone(data);
				config = Object.assign(config, this.Config);
				return config;
			},
			(error: any) => {
				store.config.setLoading();
				notification.error({
					message: `请求错误码: ${error}`,
					description: error,
				});
				return Promise.reject(error);
			}
		);
		// response
		instance.interceptors.response.use(
			(res) => {
				// 状态处理
				if (res.status && res.status === 200) {
					store.config.setLoading();
					const resData = res.data;
					// 开发环境http响应信息
					if (import.meta.env.DEV) {
						if (resData.code == 0) {
							notification.success({
								message: '[dev]响应成功',
								description: `【${this.Config.method}】${this.Config.url}`,
							});
						} else {
							notification.warning({
								message: `[dev]响应错误码：${resData.code}`,
								description: `错误提示：${resData.msg}`,
							});
						}
					}
					// http请求反馈
					if (showMsg || resMsg) {
						switch (resData.code) {
							case 0:
								message.success(resMsg || resData.msg);
								break;
							case 1001:
								message.error(resData.msg);
								break;
							case 1002:
								message.error('视频流播放错误');
								break;
							case 1401:
								message.error('token获取失败');
								break;
							case 1402:
								message.error('请求方式错误');
								break;
							case 1403:
								message.error('api地址错误');
								break;
							case 1100:
								message.error('请求参数错误');
								break;
						}
					}

					// 返回数据
					return Promise.resolve(resData.data);
				}
			},
			(error: any) => {
				store.config.setLoading();
				// 响应错误
				notification.error({
					message: '响应错误',
					description: error,
				});
				return Promise.reject(error);
			}
		);
	}

	// 发起请求
	request(options: AxiosRequestConfig, data: Object, mustToken: boolean = true, showMsg: boolean = false, resMsg?: string) {
		const instance = axios.create();
		options = _.assign(this.Config, options);
		this.interceptors(instance, data, mustToken, showMsg, resMsg);
		return instance(options);
	}
}

export const http = new HTTP_REQUEST();
