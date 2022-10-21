import { useUserStore } from '/@/store/modules/user';
import { useConfigStore } from '/@/store/modules/config';

export const useStore = () => {
	return {
		user: useUserStore(),
		config: useConfigStore(),
	};
};
