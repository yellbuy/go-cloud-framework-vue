import enLocale from 'element-plus/lib/locale/lang/en';
import zhcnLocale from 'element-plus/lib/locale/lang/zh-cn';
import zhtwLocale from 'element-plus/lib/locale/lang/zh-tw';
import { createI18n } from 'vue-i18n';
import pagesAdminEn from './pages/home/en';
import pagesAdminZhcn from './pages/home/zh-cn';
import pagesAdminZhtw from './pages/home/zh-tw';
import nextEn from '/@/i18n/lang/en';
import nextZhcn from '/@/i18n/lang/zh-cn';
import nextZhtw from '/@/i18n/lang/zh-tw';
import pagesBaseEn from '/@/i18n/pages/base/en';
import pagesBaseZhcn from '/@/i18n/pages/base/zh-cn';
import pagesBaseZhtw from '/@/i18n/pages/base/zh-tw';
import pagesCommonEn from '/@/i18n/pages/common/en';
import pagesCommonZhcn from '/@/i18n/pages/common/zh-cn';
import pagesCommonZhtw from '/@/i18n/pages/common/zh-tw';
import pagesFormI18nEn from '/@/i18n/pages/formI18n/en';
import pagesFormI18nZhcn from '/@/i18n/pages/formI18n/zh-cn';
import pagesFormI18nZhtw from '/@/i18n/pages/formI18n/zh-tw';
import pagesImsEn from '/@/i18n/pages/ims/en';
import pagesImsZhcn from '/@/i18n/pages/ims/zh-cn';
import pagesImsZhtw from '/@/i18n/pages/ims/zh-tw';
import pagesLoginEn from '/@/i18n/pages/login/en';
import pagesLoginZhcn from '/@/i18n/pages/login/zh-cn';
import pagesLoginZhtw from '/@/i18n/pages/login/zh-tw';
import { store } from '/@/store/index';


// 定义语言国际化内容
/**
 * 说明：
 * /src/i18n/lang 下的 ts 为框架的国际化内容
 * /src/i18n/pages 下的 ts 为各界面的国际化内容
 */
const messages = {
	[zhcnLocale.name]: {
		...zhcnLocale,
		message: {
			...nextZhcn,
			...pagesAdminZhcn,
			...pagesLoginZhcn,
			...pagesBaseZhcn,
			...pagesCommonZhcn,
			...pagesImsZhcn,
			...pagesFormI18nZhcn,
		},
	},
	[enLocale.name]: {
		...enLocale,
		message: {
			...nextEn,
			...pagesAdminEn,
			...pagesLoginEn,
			...pagesBaseEn,
			...pagesCommonEn,
			...pagesImsEn,
			...pagesFormI18nEn,
		},
	},
	[zhtwLocale.name]: {
		...zhtwLocale,
		message: {
			...nextZhtw,
			...pagesAdminZhtw,
			...pagesLoginZhtw,
			...pagesBaseZhtw,
			...pagesCommonZhtw,
			...pagesImsZhtw,
			...pagesFormI18nZhtw,
		},
	},
};

// 导出语言国际化
export const i18n = createI18n({
	locale: store.state.themeConfig.themeConfig.globalI18n,
	fallbackLocale: zhcnLocale.name,
	messages,
});
