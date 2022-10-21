import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
	state: () => {
		return {
			loading: false, // http loading
			activeMenu: {
				main: [],
				sub: [],
			},
		};
	},
	getters: {
		getLoading: (state) => state.loading,
		getActiveMenu: (state) => state.activeMenu,
	},
	actions: {
		setLoading() {
			this.loading = !this.loading;
		},
	},
});
