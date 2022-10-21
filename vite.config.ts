import { defineConfig, loadEnv } from 'vite';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import Environment from 'vite-plugin-environment';
import vue from '@vitejs/plugin-vue';
import ViteImages from 'vite-plugin-vue-images';
import Legacy from '@vitejs/plugin-legacy';
import path from 'path';
// import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig(({ mode }): any => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		plugins: [
			vue(),
			Environment({}),
			VueSetupExtend(),
			VueSetupExtend(),
			Legacy({
				targets: ['default', 'not IE 11'],
			}),
			// 自动import 不建议使用，阻塞了查看源代码的快捷入口
			// AutoImport({
			//   dts: './src/compiler/auto-imports.d.ts',
			//   imports: ['vue'],
			// }),
			ViteImages({
				dirs: ['/src/assets/images'], // 指明图片存放目录
			}),
		],
		resolve: {
			alias: {
				'/@': path.resolve(__dirname, './src/', ''),
			},
		},
		base: process.env.NODE_ENV === 'production' ? env.VITE_API_URL : './',
		root: process.cwd(),
		server: {
			host: '0.0.0.0',
			port: env.VITE_PORT,
			open: env.VITE_OPEN_BROWSERS,
			hmr: true,
			proxy: {
				'api/': {
					target: '0.0.0.0',
					ws: false,
					secure: false,
					changeOrigin: true,
					rewrite: (path: string) => path.replace(/^\/api/, ''),
				},
			},
		},
		esbuild: {
			pure: env.VITE_PURE ? ['console.log', 'debugger'] : [],
		},
		build: {
			outDir: 'dist',
			assetsInlineLimit: 2048,
			cssCodeSplit: false, // 独立css文件
			reportCompressedSize: true, // 开启build log
		},
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
				},
			},
		},
	};
});
