import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { v4 } from 'uuid';
import { Session } from '/@/utils/storage';
// let appid = "158625451365892097" //赋能终端
// let appid = "177152369044226049" //特查查

// let appid = "168763157232222209"//招采系统
let appid = "30"//汉风物流
// let appid = "263250626593423361"//健康档案管理
// let appid = "293576751995420673"//进销存
// let appid = "999"//业贝OA
let appPermissionKey = "ybcloudapi"
if (appid == "30") { 
	appPermissionKey = "mcs"
} else if (appid == "168763157232222209") {
	appPermissionKey = "bpp"
} else if (appid == "158625451365892097") {
	appPermissionKey = "ims"
} else if (appid == "263250626593423361") {
	appPermissionKey = "hcis"
} else if (appid == "293576751995420673") {
	appPermissionKey = "psi"
} else if (appid == "999") {
	appPermissionKey = "yb"
}

const commonHeaders={ 'Content-Type': 'application/json', 'Appid': appid, "X-Client-Type": "web" }
// 配置新建一个 axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_API_URL as any,
	timeout: 100000,
	headers: commonHeaders,
	withCredentials: true,
	responseType: '',
});

const setAppid = (newAppid: string = "0") => {
	appid = newAppid;
	service.defaults.headers["Appid"] = appid;
}




axios.defaults.retry = 3;
axios.defaults.retryDelay = 10000;

const authorizationHeaderKey="Authorization" //header头Token的键名
const xsrftokenHeaderKey="X-Xsrftoken"
const xsrftokenSessionKey="xsrftoken"
const timestampHeaderKey="X-Timestamp"

const getRequestHeaders=() =>{
	const token = Session.get('token');
	const xsrftoken = Session.get(xsrftokenSessionKey);
	const headers={ ...commonHeaders, authorizationHeaderKey:token||"",xsrftokenHeaderKey:xsrftoken||"",timestampHeaderKey:new Date().getTime() }
	return headers
}

// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么 token
		const token = Session.get('token');
		
		if (token) {
			config.headers.set(authorizationHeaderKey, token);

			// const tokenExpiresAt=new Date(Session.get('expiresAt'));
			// 	const refreshTokenAt=new Date(Session.get('refreshTokenAt'));
			// 	const curTime=new Date();
			// 	if(curTime>=refreshTokenAt && curTime<tokenExpiresAt){
			// 		const oriUrl=config.url;
			// 		const data=await config({url:"/v1/base/user/refreshtoken",method: 'post'})
			// 	}
			// if(config.url=="/v1/base/user/refreshtoken"){

			// }
		}
		const xsrftoken = Session.get(xsrftokenSessionKey);
		console.log("xsrftoken:",xsrftoken)
		if (xsrftoken) {
			config.headers.set(xsrftokenHeaderKey, xsrftoken);	
		}
		//时间戳
		config.headers.set(timestampHeaderKey, new Date().getTime());
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		if (response.config.responseType == "blob") {
			return Promise.resolve({ errcode: 0, errmsg: "", data: response.data })
		}
		
		// 对响应数据做点什么
		const res = response.data;
		
		//console.debug("response:",response);
		if (res.errcode && res.errcode !== 0) {

			// `token` 过期或者账号已在别处登录
			if (res.errcode === 100001 || res.errcode === 100002) {
				Session.clear(); // 清除浏览器全部临时缓存
				ElMessageBox.confirm('当前用户已退出或无权限访问当前资源，请尝试重新登录后再操作。', '温馨提示', {
					type: 'error',
					closeOnClickModal: false,
					center: true,
					confirmButtonText: '重新登录'
				}).then(() => {
					window.location.href = '/'; // 去登录页
				}).catch(() => { window.location.href = '/'; })

				// ElMessageBox.alert('无权限访问', '温馨提示', {})
				// 	.then(() => {
				// 		window.location.href = '/'; // 去登录页
				// 	})
				// 	.catch(() => {});

			} else if (res.errcode == 100007){
				Session.clear(); // 清除浏览器全部临时缓存
				ElMessage.error({
					showClose: true,
					message: `${res.errmsg}`,
					onClose: async function () {
						window.location.href = `/#changepassword?appid=${res.data.Appid}&userId=${res.data.Id}&username=${res.data.Username}`; // 去更改密码页面
					},
				});
				
			}
			//return Promise.reject(service.interceptors.response);
		} else {
			if(response.headers){
				const token=response.headers[authorizationHeaderKey.toLocaleLowerCase()];
				if(token){
					Session.set('token', token);
				}				
			}
			//return Promise.resolve(res)
		}
		if(response.headers){
			const token=response.headers[xsrftokenHeaderKey.toLocaleLowerCase()];
			if(token){
				Session.set(xsrftokenSessionKey, token);
			}				
		}
		return Promise.resolve(res)
	},
	(error) => {
		console.log("error:",error)
		if (error.response) {
			if (error.response.status == 401) {
				Session.clear(); // 清除浏览器全部临时缓存
				ElMessageBox.confirm('无权限访问当前资源，请尝试重新登录后再操作。', '温馨提示', {
					type: 'error',
					closeOnClickModal: false,
					center: true,
					confirmButtonText: '重新登录'
				}).then(() => {
					window.location.href = '/'; // 去登录页
				}).catch(() => { window.location.href = '/'; })
			} else if (error.response.status == 422) {
				//跨站脚本攻击，或_xsrf Cookie已过期
				Session.clear(); // 清除浏览器全部临时缓存
				ElMessageBox.confirm('登录已过期或无权限访问当前资源，请尝试重新登录后再操作。', '温馨提示', {
					type: 'error',
					closeOnClickModal: false,
					center: true,
					confirmButtonText: '重新登录'
				}).then(() => {
					window.location.href = '/'; // 去登录页
				}).catch(() => { window.location.href = '/'; })
			} else if (error.response.status == 404) {
				ElMessage({
					grouping: true,
					showClose: true,
					message: "Status：404，正在请求不存在的服务器记录！",
					duration: 3600,
					type: 'error',
				})
			} else if (error.response.status == 500) {
				ElMessage({
					grouping: true,
					showClose: true,
					message: "Status：500，服务器发生错误！",
					duration: 3600,
					type: 'error',
				})
				// ElNotification.error({
				// 	title: '请求错误',
				// 	message: error.response.data.message || "Status:500，服务器发生错误！"
				// });
			} else if (error.response.status == 401) {
				ElMessageBox.confirm('当前用户已退出或无权限访问当前资源，请尝试重新登录后再操作。', '温馨提示', {
					type: 'error',
					closeOnClickModal: false,
					center: true,
					confirmButtonText: '重新登录'
				}).then(() => {
					window.location.href = '/'; // 去登录页
				}).catch(() => { })
			} else {
				ElMessage({
					grouping: true,
					showClose: true,
					message: `Status：${error.response.status}，${error.response.statusText}`,
					duration: 3600,
					type: 'error',
				})
			}
		} else {
			ElNotification.error({
				title: '请求错误',
				message: "请求服务器无响应！"
			});
		}

		return Promise.reject(error.response);
	}
);

const _request = (config: RequestConfig) => {
	//console.log("config：", config)
	config = Object.assign({ notifyError: true }, config)

	//const headers:Record<string, string> = {};
	if (!config.nonce) {
		config.nonce = v4().replace(/-/g, "");
	}
	config.headers = Object.assign(config.headers || {}, { "X-Nonce": config.nonce })

	return new Promise<RequestResponse>((resolve, reject) => {
		service({
			...config
		}).then((response) => {
			console.debug("response:",response);
			const res: RequestResponse = { errcode: response.errcode, errmsg: response.errmsg, data: response.data, total: response.total }

			if (res.errcode != 0 && res.errcode != 100001 && res.errcode != 100002 && config.notifyError) {
				ElNotification.error({
					title: '温馨提示',
					message: res.errmsg
				});
				// ElMessage({
				// 	grouping:true,
				// 	showClose: true,
				// 	message: res.errmsg,
				//  duration:4500,
				// 	type: 'error',
				// })
			}
			resolve(res);
		}).catch((error) => {
			reject(error);
		})
	})
}

const http = {
	request: _request,
	get: (url: string, params?: any, config?: RequestConfig) => {
		return _request({
			method: 'get',
			url: url,
			params: params,
			...config
		})
	},
	post: (url: string, data?: any, config?: RequestConfig) => {
		return _request({
			method: 'post',
			url,
			data,
			...config
		})
	},
	put: (url: string, data?: any, config?: RequestConfig) => {
		return _request({
			method: 'put',
			url,
			data,
			...config
		})
	},
	delete: (url: string, data?: any, config?: RequestConfig) => {
		return _request({
			method: 'delete',
			url,
			data,
			...config
		})
	},
	/** jsonp 请求
	 * @param  {接口地址} url
	 * @param  {JSONP回调函数名称} name
	 */
	jsonp: (url: string, name = 'jsonp') => {
		return new Promise((resolve) => {
			var script = document.createElement('script')
			var _id = `jsonp${Math.ceil(Math.random() * 1000000)}`
			script.id = _id
			script.type = 'text/javascript'
			script.src = url
			window[name] = (response) => {
				resolve(response)
				document.getElementsByTagName('head')[0].removeChild(script)
				try {
					delete window[name];
				} catch (e) {
					window[name] = undefined;
				}
			}
			document.getElementsByTagName('head')[0].appendChild(script)
		})
	}
}

export { appid, appPermissionKey, getRequestHeaders, http, service as request, setAppid };

// 导出 axios 实例
export default service;

//自定义请求配置
export interface RequestConfig extends AxiosRequestConfig {
	//随机字符串
	nonce?: string;
	//是否显示错误
	notifyError?: boolean;
}

export interface RequestResponse {
	errcode: number;
	data: any;
	total?: number;
	errmsg: string;
}