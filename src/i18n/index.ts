import enLocale from 'element-plus/lib/locale/lang/en';
import zhcnLocale from 'element-plus/lib/locale/lang/zh-cn';
import zhtwLocale from 'element-plus/lib/locale/lang/zh-tw';
import { createI18n } from 'vue-i18n';
import pagesFormI18nEn from './formI18n/en';
import pagesFormI18nZhcn from './formI18n/zh-cn';
import pagesFormI18nZhtw from './formI18n/zh-tw';
import nextEn from '/@/i18n/lang/en';
import nextZhcn from '/@/i18n/lang/zh-cn';
import nextZhtw from '/@/i18n/lang/zh-tw';


import { store } from '/@/store/index';

//自动导入pages文件夹下的本地化文件
const files = import.meta.globEager('./pages/**/*.ts')

const localeMessages = Object.keys(files).reduce(
  (localeMessages: { [key: string]: any }, path: string) => {
    const moduleNames = path.replace(/(\.\/pages\/|\.ts)/g, '').split("/");
	//文件名称为语言类型的名称
	const localName=moduleNames.at(-1)!;
	if(!localeMessages[localName]){
		//首次加载，初始化对象
		localeMessages[localName]={}
	}
	
    let curModule=localeMessages[localName]
    moduleNames.forEach((val,index,array)=>{
        if(index>=moduleNames.length-2){
            return;
        }
		if(!curModule[val]){
			curModule[val]={}
		}        
        curModule=curModule[val]
    })
    const func=files[path]?.default;
	if(moduleNames.length>1){
		curModule[moduleNames.at(-2)!]=Object.assign({},func);
		localeMessages[localName]=Object.assign(localeMessages[localName],curModule);
	} else {
		localeMessages[localName]=Object.assign(localeMessages[localName],func);
	}
    
    
    return localeMessages
  },
  {}
)
// 定义语言国际化内容
/**
 * 说明：
 * /src/i18n/lang 下的 ts 为框架的国际化内容
 * /src/i18n/formi18n 下的 ts 为各界面的国际化内容
 */
const messages = {
	[zhcnLocale.name]: {
		...zhcnLocale,
		message: {
			...nextZhcn,
			...pagesFormI18nZhcn,
		},
		pages: {
			...localeMessages[zhcnLocale.name]
		},
	},
	[enLocale.name]: {
		...enLocale,
		message: {
			...nextEn,
			...pagesFormI18nEn,
			...localeMessages[enLocale.name]
		},
		pages: {
			...localeMessages[enLocale.name]
		},
	},
	[zhtwLocale.name]: {
		...zhtwLocale,
		message: {
			...nextZhtw,
			...pagesFormI18nZhtw,
			
		},
		pages: {
			...localeMessages[zhtwLocale.name]
		},
	},
};

// 导出语言国际化
export const i18n = createI18n({
	locale: store.state.themeConfig.themeConfig.globalI18n,
	fallbackLocale: zhcnLocale.name,
	messages,
});
