import dotenv from 'dotenv';

export interface ViteEnv {
	VITE_API_URL: string;
	VITE_PORT: number;
	VITE_PURE: boolean;
	VITE_OPEN_BROWSERS: boolean;
}

export const loadEnv = (mode: string | undefined): ViteEnv => {
	const ret: any = {};
	dotenv.config({
		path: `.env.${mode}`,
	});

	for (const envName of Object.keys(process.env)) {
		let realName = (process.env as any)[envName].replace(/\\n/g, '\n');
		ret[envName] = realName;
		// 扩展process.env自定义VITE环境变量
		process.env[envName] = realName;
	}
	return ret;
};
