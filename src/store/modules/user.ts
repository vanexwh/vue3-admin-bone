import { defineStore } from 'pinia';
import { UserInfo } from '/@/types/store';

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			info: {
				name: 'vane',
				isAdmin: true,
				role: '1',
			} as UserInfo,
			token: '',
		};
	},
	persist: {
		enabled: true,
		strategies: [{ storage: localStorage }],
	},
	getters: {
		getToken: (state) => state.token,
	},
	actions: {},
});
