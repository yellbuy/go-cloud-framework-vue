// 通用函数
import CryptoJS from 'crypto-js';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import useClipboard from 'vue-clipboard3';
import { useI18n } from 'vue-i18n';
import { formatDate } from '/@/utils/formatTime';
export default function () {

	const { toClipboard } = useClipboard();

	
	//列表日期时间格式化
	const dateFormatYMD = (row: any, column: number, cellValue: any) => {
		if (!cellValue || cellValue.toString().substr(0, 4) <= '0001') return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm-dd');
	};
	//列表日期时间格式化
	const dateFormatYMDHM = (row: any, column: number, cellValue: any) => {
		if (!cellValue || cellValue.toString().substr(0, 4) <= '0001') return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm-dd HH:MM');
	};
	//列表日期时间格式化
	const dateFormatYMDHMS = (row: any, column: number, cellValue: any) => {
		if (!cellValue || cellValue.toString().substr(0, 4) <= '0001') return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm-dd HH:MM:SS');
	};
	//列表日期时间格式化
	const dateFormatHMS = (row: any, column: number, cellValue: any) => {
		if (!cellValue || cellValue.toString().substr(0, 4) <= '0001') return '-';
		return formatDate(new Date(cellValue), 'HH:MM:SS');
	};
	//列表日期时间格式化
	const dateFormatHM = (row: any, column: number, cellValue: any) => {
		if (!cellValue || cellValue.toString().substr(0, 4) <= '0001') return '-';
		return formatDate(new Date(cellValue), 'HH:MM');
	};
	//列表日期时间格式化
	const dateFormatY = (row: any, column: number, cellValue: any) => {
		if (!cellValue || cellValue.toString().substr(0, 4) <= '0001') return '-';
		return formatDate(new Date(cellValue), 'YYYY');
	};
	//列表日期时间格式化
	const dateFormatYM = (row: any, column: number, cellValue: any) => {
		if (!cellValue || cellValue.toString().substr(0, 4) <= '0001') return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm');
	};
	//列表日期时间格式化
	const dateFormatMD = (row: any, column: number, cellValue: any) => {
		if (!cellValue || cellValue.toString().substr(0, 4) <= '0001') return '-';
		return formatDate(new Date(cellValue), 'mm-dd');
	};


	/* 日期格式化 */
	const dateFormat = (date: any, fmt = 'YYYY-mm-dd HH:MM:SS') => {
		return formatDate(new Date(date), fmt)
	}
	/* 日期快速配置数组 */
	const dateShortcuts  = () => {
		const shortcuts = [
			{
			  text: '今日',
			  value: () => {
				const start = dayjs().startOf("day").toDate()
				const end = dayjs().endOf("day").toDate()
				return [start, end]
			  },
			}, {
			  text: '昨日',
			  value: () => {
				const time=dayjs().subtract(1,"day")
				const start = time.startOf("day").toDate()
				const end = time.endOf("day").toDate()
				return [start, end]
			  },
			}, {
			  text: '近两日',
			  value: () => {
				const time=dayjs()
				const start = time.subtract(1,"day").startOf("day").toDate()
				const end = time.endOf("day").toDate()
				return [start, end]
			  },
			}, {
				text: '本周',
				value: () => {
				  const time=dayjs()
				  const start = time.startOf("week").toDate()
				  const end = time.endOf("week").toDate()
				  return [start, end]
				},
			  }, {
				text: '近一周',
				value: () => {
					const time=dayjs()
					const start = time.subtract(6,"day").startOf("day").toDate()
					const end = time.endOf("day").toDate()
					return [start, end]
				},
			  }, {
				text: '本月',
				value: () => {
					const time=dayjs()
				  	const start = time.startOf("month").toDate()
				  	const end = time.endOf("month").toDate()
				  	return [start, end]
				},
			  }, {
				text: '上月',
				value: () => {
					const time=dayjs().subtract(1,"month")
					const start = time.startOf("month").toDate()
					const end = time.endOf("month").toDate()
					return [start, end]
				},
			  }, {
				text: '近一月',
				value: () => {
					const time=dayjs()
					const start = time.subtract(1,"month").add(1,"day").startOf("day").toDate()
					const end = time.endOf("day").toDate()
					return [start, end]
				},
			  }, {
				text: '近三月',
				value: () => {
					const time=dayjs()
					const start = time.subtract(3,"month").add(1,"day").startOf("day").toDate()
					const end = time.endOf("day").toDate()
					return [start, end]
				},
			  }, {
				text: '本年',
				value: () => {
					const time=dayjs()
				  	const start = time.startOf("year").toDate()
				  	const end = time.endOf("year").toDate()
				  	return [start, end]
				},
			  }, {
				text: '去年',
				value: () => {
					const time=dayjs().subtract(1,"year")
					const start = time.startOf("day").toDate()
					const end = time.endOf("day").toDate()
					return [start, end]
				},
			  }, {
				text: '近一年',
				value: () => {
					const time=dayjs()
					const start = time.subtract(1,"year").add(1,"day").startOf("day").toDate()
					const end = time.endOf("day").toDate()
					return [start, end]
				},
			  }, {
				text: '近三年',
				value: () => {
					const time=dayjs()
					const start = time.subtract(3,"year").add(1,"day").startOf("day").toDate()
					const end = time.endOf("day").toDate()
					return [start, end]
				},
			  }
		  ]
		  return  shortcuts
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
	const copyObj = (obj: any) => {
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
	const groupSeparator = (num: any) => {
		let numStr = num + '';
		if (!numStr.includes('.')) {
			numStr += '.'
		}
		return numStr.replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => {
			return $1 + ',';
		}).replace(/\.$/, '');
	}

	/**
	 * 金额转中文大写
	 * @param val 金额数值
	 */
	const toUpperCaseAmount = (value:number)=> {
		// 将数字金额转换为大写的逻辑
		const digitUppercase = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
		const unit = ['元', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟', '万'];
		// 小数部分----将数字转换为字符串，并按小数点进行分割
		const amountStr = String(value).split('.');
		// 整数部分转换
		let integerPart = '';
		for (let i = 0; i < amountStr[0].length; i++) {
			integerPart += digitUppercase[parseInt(amountStr[0][i])] + unit[amountStr[0].length - i - 1];
		}
		// 小数部分转换
		let decimalPart = '';
		if (amountStr[1] && amountStr[1].length > 0) {
			decimalPart = digitUppercase[parseInt(amountStr[1][0])] + '角';
			if (amountStr[1].length > 1) {
				decimalPart += digitUppercase[parseInt(amountStr[1][1])] + '分';
			}
		}
		return integerPart + decimalPart;
	}

	/* 是否为合法URL地址 */
	const isUrl = (url: string) => {
		const reg = /^(\/\/|[hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
		return reg.test(url)
	}

	/* 静态路径解析 */
	const staticUrlParse = (path: string) => {
		if (isUrl(path)) {
			//完整域名路径，直接返回
			return path;
		}
		return import.meta.env.VITE_URL + path
	}
	/* 头像路径 */
	const staticHeardUrl = (id: string) => {
		const baseUrl = '/static/img/avatar/user/'
		return baseUrl + id + '.png'
	}

	/* 常用加解密 */
	const crypto = {
		//MD5加密
		MD5(data: string) {
			return CryptoJS.MD5(data).toString()
		},
		//BASE64加解密
		BASE64: {
			encrypt(data: string) {
				return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data))
			},
			decrypt(cipher: string) {
				return CryptoJS.enc.Base64.parse(cipher).toString(CryptoJS.enc.Utf8)
			}
		},
		//AES加解密
		AES: {
			encrypt(data: string, secretKey: string) {
				const result = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(secretKey), {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
				})
				return result.toString()
			},
			decrypt(cipher: string, secretKey: string) {
				const result = CryptoJS.AES.decrypt(cipher, CryptoJS.enc.Utf8.parse(secretKey), {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
				})
				return CryptoJS.enc.Utf8.stringify(result);
			}
		}
	}

	return {
		isUrl,
		percentFormat,
		dateFormat,
		
		dateFormatYMD,
		dateFormatYM,
		dateFormatMD,
		dateFormatY,
		dateFormatYMDHM,
		dateFormatYMDHMS,
		dateFormatHMS,
		dateFormatHM,
		dateShortcuts,

		scaleFormat,
		scale2Format,
		groupSeparator,
		toUpperCaseAmount,
		staticUrlParse,
		staticHeardUrl,
		crypto,
		copyObj,
		copyText,
	};
}
