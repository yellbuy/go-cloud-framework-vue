import { http } from '/@/utils/request';

export default{
	
	/**
	 * 获取应用列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	getList:async (params: object={})=>{
		const url=`/v1/admin/base/apps`;
		return await http.get(url, params);
	},
	/**
	 * 获取应用，需授权
	 * @param id 应用标识
	 * @returns 返回接口数据
	 */
	 getById:async (id: number|string)=>{
		const url=`/v1/admin/base/app/${id}`;
		return await http.get(url);
	},
	/**
	 * 获取应用，无需授权，不会加载敏感信息
	 * @param id 应用标识
	 * @returns 返回接口数据
	 */
	 getCacheById:async (id: number|string)=>{
		const url=`/v1/base/app/${id}`;
		return await http.get(url);
	},
	/**
	 * 新增应用
	 * @param data 应用信息
	 * @returns 返回接口数据
	 */
	insert:async(data:object)=>{
		const url=`/v1/admin/base/app`;
		return await http.post(url, data);
	},
	/**
	 * 更新应用
	 * @param data 应用信息
	 * @returns 返回接口数据
	 */
	update:async(data:object)=>{
		const url=`/v1/admin/base/app/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 新增或更新应用
	 * @param data 应用信息
	 * @returns 返回接口数据
	 */
	save:async(data:object)=>{
		if(!data.Id||data.Id=="0"){
			const url=`/v1/admin/base/app`;
			return await http.post(url, data);
		}
		const url=`/v1/admin/base/app/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 删除应用
	 * @param id 应用标识
	 * @returns 返回接口数据
	 */
	delete:async(id:number|string)=>{
		const url=`/v1/admin/base/app/delete/${id}`;
		return await http.post(url);
	},
}