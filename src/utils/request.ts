import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Session } from '/@/utils/storage';

let appid = "158625451365892097"
// 配置新建一个 axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_API_URL as any,
	timeout: 100000,
	headers: { 'Content-Type': 'application/json', 'Appid': appid },
});

axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		
		// 在发送请求之前做些什么 token
		const token = Session.get('token');
		if (token) {
			config.headers.common['Authorization'] = token;
			
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
		// 对响应数据做点什么
		const res = response.data;
		//console.debug(res);
		if (res.errcode && res.errcode !== 0) {
			
			// `token` 过期或者账号已在别处登录
			if (res.errcode === 100001 || res.errcode === 100002) {
				Session.clear(); // 清除浏览器全部临时缓存
				ElMessageBox.alert('无权限访问', '温馨提示', {})
					.then(() => {
						window.location.href = '/'; // 去登录页
					})
					.catch(() => {});
					
			} else {
				ElMessage.error(res.errmsg)
			}
			return Promise.reject(service.interceptors.response);
		} else {
			//return Promise.resolve(res)
		}
		return Promise.resolve(res)
	},
	(error) => {
		// 对响应错误做点什么
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else {
			if (error.response.data) ElMessage.error(error.response.statusText);
			else ElMessage.error('接口路径未找到');
		}
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
