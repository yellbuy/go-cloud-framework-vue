import { createApp } from 'vue';

import 'devextreme/dist/css/dx.material.teal.light.compact.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import mitt from 'mitt';
import VueGridLayout from 'vue-grid-layout';
import VueUeditorWrap from 'vue-ueditor-wrap';
import screenShort from 'vue-web-screen-shot';
// import VXETablePluginElement from 'vxe-table-plugin-element';
// import 'vxe-table-plugin-element/dist/style.css';
// import 'vxe-table/lib/style.css';
import DataVVue3 from '@kjgl77/datav-vue3';
import App from './App.vue';
import router from './router';
import { key, store } from './store';
import { i18n } from '/@/i18n/index';
import '/@/theme/index.scss';
import { directive } from '/@/utils/directive';
import other from '/@/utils/other';
//VXETable.use(VXETablePluginElement)

// VXETable.config({
// 	// 对组件内置的提示语进行国际化翻译
// 	i18n: (key, args) => i18n.global.t(key, args)
//   })

  //Vue.use(VXETable)
// import '/@/views/meta/components/DynamicForm/styles/index.styl';

import api from '/@/api';

import formControls from '/@/views/meta/components/FormControls/index.ts';


import utils from '/@/utils';
import errorHandler from '/@/utils/errorHandler';
import { NextLoading } from '/@/utils/loading';
import { http } from '/@/utils/request';
import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'
const app = createApp(App);

//全局代码错误捕捉
app.config.errorHandler = errorHandler

directive(app);
other.elSvg(app);
other.metaSvg(app);
formControls.install(app);

app
	.use(router)
	.use(store, key)
	.use(ElementPlus)
	.use(DataVVue3)
	.use(i18n)
	.use(VueUeditorWrap)
	.use(screenShort, { enableWebRtc: false })
	.use(VueGridLayout)
	.use(VxeUITable)
	.mount('#app');
	
app.config.globalProperties.mittBus = mitt();
app.config.globalProperties.$api = api;
app.config.globalProperties.$http = http; 
app.config.globalProperties.$utils = utils; 
app.config.globalProperties.$calcMainHeight = other.calcMainHeight;
app.config.globalProperties.$calcWidth = other.calcWidth;
app.config.globalProperties.$loading = NextLoading;

//全局代码错误捕捉
app.config.errorHandler = errorHandler