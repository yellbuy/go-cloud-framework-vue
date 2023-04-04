import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import type { UserConfig } from 'vite';
import { loadEnv } from './src/utils/viteBuild';
import { svgBuilder } from './src/views/meta/components/DynamicForm/icons/index.js';

const pathResolve = (dir: string): any => {
	return resolve(__dirname, '.', dir);
};

const { VITE_PORT, VITE_OPEN, VITE_PUBLIC_PATH } = loadEnv();
 
const alias: Record<string, string> = {
	'@': pathResolve('./src/'),
	'/@': pathResolve('./src/'),
	'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};

const viteConfig: UserConfig = {
	plugins: [vue(),vueJsx(),svgBuilder('./src/views/meta/components/DynamicForm/icons/svg/'),svgBuilder('./src/views/meta/components/FormCreate/icons/svg/')],
	root: process.cwd(),
	resolve: { alias },
	base: process.env.NODE_ENV === 'production' ? VITE_PUBLIC_PATH : './',
	optimizeDeps: {
		include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en', 'element-plus/lib/locale/lang/zh-tw'],
	},
	server: {
		host: '0.0.0.0',
		port: VITE_PORT,
		open: VITE_OPEN,
		proxy: {
			'/gitee': {
				target: 'https://gitee.com',
				ws: true,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/gitee/, ''),
			},
		},
	},
	build: {
		outDir: 'dist',
		minify: 'esbuild',
		sourcemap: false,
		chunkSizeWarningLimit: 1500,
		rollupOptions: {
			output: {
				entryFileNames: `assets/[name].${new Date().getTime()}.js`,
				chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
				assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
			},
		},
	},
	css: {
		postcss: {
			plugins: [
				{
					postcssPlugin: 'internal:charset-removal',
					AtRule: {
						charset: (atRule) => {
							if (atRule.name === 'charset') {
								atRule.remove();
							}
						},
					},
				},
			],
		},
	},
	define: {
		__VUE_I18N_LEGACY_API__: JSON.stringify(false),
		__VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
		__INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false), 
	},
};

export default viteConfig;
