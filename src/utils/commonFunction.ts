// 通用函数
import CryptoJS from 'crypto-js';
import { ElMessage } from 'element-plus';
import useClipboard from 'vue-clipboard3';
import { useI18n } from 'vue-i18n';
import { formatDate } from '/@/utils/formatTime';

export default function () {
	
	const { toClipboard } = useClipboard();
	
	//列表日期时间格式化
	const dateFormatYMD = (row: any, column: number, cellValue: any) => {
		if (!cellValue || cellValue.toString().substr(0,4)<='1970') return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm-dd');
	};
	//列表日期时间格式化
	const dateFormatYMDHM = (row: any, column: number, cellValue: any) => {
		if (!cellValue || cellValue.toString().substr(0,4)<='1970') return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm-dd HH:MM');
	};
	//列表日期时间格式化
	const dateFormatYMDHMS = (row: any, column: number, cellValue: any) => {
		if (!cellValue || cellValue.toString().substr(0,4)<='1970') return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm-dd HH:MM:SS');
	};
	//列表日期时间格式化
	const dateFormatHMS = (row: any, column: number, cellValue: any) => {
		if (!cellValue || cellValue.toString().substr(0,4)<='1970') return '-';
		let time = 0;
		if (typeof row === 'number') time = row;
		if (typeof cellValue === 'number') time = cellValue;
		return formatDate(new Date(time * 1000), 'HH:MM:SS');
	};

	
	/* 日期格式化 */
	const dateFormat = (date:any, fmt='YYYY-mm-dd HH:MM:SS')=>  {
		return formatDate(new Date(date),fmt)
	}
	// 小数格式化
	const scaleFormat = (value: any = 0, scale: number = 4) => {
		return Number.parseFloat(value).toFixed(scale);
	};
	// 小数格式化
	const scale2Format = (value: any = 0) => {
		return Number.parseFloat(value).toFixed(2);
	};
	/* 复制对象 */
	const copyObj = (obj:any)=> {
		return JSON.parse(JSON.stringify(obj));
	}
	//百分比格式化
	const percentFormat = (row: any, column: number, cellValue: any) => {
		return cellValue ? `${cellValue}%` : '-';
	};
	// 点击复制文本
	const copyText = (text: string) => {
		return new Promise((resolve, reject) => {
			try {
				const { t } = useI18n();
				//复制
				toClipboard(text);
				//下面可以设置复制成功的提示框等操作
				ElMessage.success(t('message.layout.copyTextSuccess'));
				resolve(text);
			} catch (e) {
				//复制失败
				ElMessage.error(t('message.layout.copyTextError'));
				reject(e);
			}
		});
	};

	
	/* 千分符 */
	const groupSeparator = (num:any)=> {
		let numStr = num + '';
		if(!numStr.includes('.')){
			numStr += '.'
		}
		return numStr.replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1)=> {
			return $1 + ',';
		}).replace(/\.$/, '');
	}

	/* 常用加解密 */
	const crypto = {
		//MD5加密
		MD5(data:string){
			return CryptoJS.MD5(data).toString()
		},
		//BASE64加解密
		BASE64: {
			encrypt(data:string){
				return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data))
			},
			decrypt(cipher:string){
				return CryptoJS.enc.Base64.parse(cipher).toString(CryptoJS.enc.Utf8)
			}
		},
		//AES加解密
		AES: {
			encrypt(data:string, secretKey:string){
				const result = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(secretKey), {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
				})
				return result.toString()
			},
			decrypt(cipher:string, secretKey:string){
				const result = CryptoJS.AES.decrypt(cipher, CryptoJS.enc.Utf8.parse(secretKey), {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
				})
				return CryptoJS.enc.Utf8.stringify(result);
			}
		}
	}

	return {
		percentFormat,
		dateFormat,
		dateFormatYMD,
		dateFormatYMDHM,
		dateFormatYMDHMS,
		dateFormatHMS,
		scaleFormat,
		scale2Format,
		groupSeparator,
		crypto,
		copyObj,
		copyText,
	};
}
