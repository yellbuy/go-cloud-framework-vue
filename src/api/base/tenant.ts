import { http } from '/@/utils/request';

export default{
	
	/**
	 * 获取租户列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	getList:async (params: object={})=>{
		const url=`/v1/admin/base/tenants`;
		return await http.get(url, params);
	},
	/**
	 * 获取租户，需授权
	 * @param id 租户标识
	 * @returns 返回接口数据
	 */
	 getById:async (id: number|string)=>{
		const url=`/v1/admin/base/tenant/${id}`;
		return await http.get(url);
	},
	/**
	 * 获取租户，无需授权，不会加载敏感信息
	 * @param id 租户标识
	 * @returns 返回接口数据
	 */
	 getCacheById:async (id: number|string)=>{
		const url=`/v1/base/tenant/${id}`;
		return await http.get(url);
	},
	/**
	 * 新增租户
	 * @param data 租户信息
	 * @returns 返回接口数据
	 */
	insert:async(data:object)=>{
		const url=`/v1/admin/base/tenant`;
		return await http.post(url, data);
	},
	/**
	 * 更新租户
	 * @param data 租户信息
	 * @returns 返回接口数据
	 */
	update:async(data:object)=>{
		const url=`/v1/admin/base/tenant/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 新增或更新租户
	 * @param data 租户信息
	 * @returns 返回接口数据
	 */
	save:async(data:object)=>{
		if(!data.Id||data.Id=="0"){
			const url=`/v1/admin/base/tenant`;
			return await http.post(url, data);
		}
		const url=`/v1/admin/base/tenant/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 删除租户
	 * @param id 租户标识
	 * @returns 返回接口数据
	 */
	delete:async(id:number|string)=>{
		const url=`/v1/admin/base/tenant/delete/${id}`;
		return await http.post(url);
	},
}