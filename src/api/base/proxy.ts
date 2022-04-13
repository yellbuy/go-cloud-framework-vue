import { http } from '/@/utils/request';

export default {
	/**
	 * 进入应用后台
	 * @param id 应用标识
	 * @returns 返回接口数据
	 */
	 
	enterApp:async(id:number|string)=>{
		const url=`/v1/admin/base/proxy/app/${id}`;
		return await http.post(url);
	},
	/**
	 * 进入租户后台
	 * @param id 租户标识
	 * @returns 返回接口数据
	 */
	 enterTenant:async(id:number|string)=>{
		const url=`/v1/admin/base/proxy/tenant/${id}`;
		return await http.post(url);
	},
	/**
	 * 代理返回
	 * @param id 租户标识
	 * @returns 返回接口数据
	 */
	 return:async(isTop:boolean)=>{
		const url=`/v1/admin/base/proxy/return?isTop={isTop}`;
		return await http.post(url);
	},
}