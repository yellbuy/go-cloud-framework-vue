import enLocale from 'element-plus/es/locale/lang/en';
import zhcnLocale from 'element-plus/es/locale/lang/zh-cn';
import zhtwLocale from 'element-plus/es/locale/lang/zh-tw';
import { createI18n } from 'vue-i18n';
// import enUSTableLocale from 'vxe-table/lib/locale/lang/en-US';
// import zhCNTableLocale from 'vxe-table/lib/locale/lang/zh-CN';
// import zhTWTableLocale from 'vxe-table/lib/locale/lang/zh-TW';
import pagesFormI18nEn from './formI18n/en';
import pagesFormI18nZhcn from './formI18n/zh-cn';
import pagesFormI18nZhtw from './formI18n/zh-tw';
import nextEn from '/@/i18n/lang/en';
import nextZhcn from '/@/i18n/lang/zh-cn';
import nextZhtw from '/@/i18n/lang/zh-tw';


import { store } from '/@/store/index';

//自动导入pages文件夹下的本地化文件
const files = import.meta.glob('./pages/**/*.ts',{ eager: true })

const localeMessages = Object.keys(files).reduce(
  (localeMessages: { [key: string]: any }, path: string) => {
    const moduleNames = path.replace(/(\.\/pages\/|\.ts)/g, '').split("/");
	//文件名称为语言类型的名称
	const localName=moduleNames[moduleNames.length-1]
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
		const curKey=moduleNames[moduleNames.length-2]
		curModule[curKey]=Object.assign({},func);
		//进行当前层级语言包的合并
		localeMessages[localName]=Object.assign(localeMessages[localName],curModule);
	} else {
		//进行语言包合并
		localeMessages[localName]=Object.assign(localeMessages[localName],func);
	}
	//console.log("localeMessages:",localeMessages)
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
		//...zhCNTableLocale,
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
		//...enUSTableLocale,
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
		//...zhTWTableLocale,
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
	legacy:false,
	locale: store.state.themeConfig.themeConfig.globalI18n,
	fallbackLocale: zhcnLocale.name,
	allowComposition:true,
	messages,
});
