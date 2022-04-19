import { http } from '/@/utils/request';

export default{
	
	/**
	 * 获取列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
	getList:async (params: object={})=>{
		const url=`/v1/admin/ims/casepersonlines`;
		return await http.get(url, params);
	},
	/**
	 * 获取记录
	 * @param id 要传的标识
	 * @returns 返回接口数据
	 */
    getById:async (id:number|string)=>{
		const url=`/v1/admin/ims/casepersonline/${id}`;
		return await http.get(url);
	},
	/**
	 * 获取记录
	 * @param id 要传的标识
	 * @returns 返回接口数据
	 */
	 downloadById:async (id:number|string)=>{
		const url=`/v1/ims/casepersonline/pdfout/${id}?command=casePdf`;
		return await http.download(url);
	},
	/**
	 * 新增
	 * @param data 记录
	 * @returns 返回接口数据
	 */
	insert:async(data:object)=>{
		const url=`/v1/admin/ims/casepersonline`;
		return await http.post(url, data);
	},
	/**
	 * 更新记录
	 * @param data 记录数据
	 * @returns 返回接口数据
	 */
	 update:async(data:object)=>{
		const url=`/v1/admin/ims/casepersonline/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 更新步骤
	 * @param data 记录数据
	 * @returns 返回接口数据
	 */
	 updateStep:async(step:Number|String,data:object)=>{
		const url=`/v1/admin/ims/casepersonline/${step}/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 新增或更新记录
	 * @param data 记录数据
	 * @returns 返回接口数据
	 */
	save:async(data:object)=>{
		if(!data.Id||data.Id=="0"){
			const url=`/v1/admin/ims/casepersonline`;
			return await http.post(url, data);
		}
		const url=`/v1/admin/common/casepersonline/${data.Id}`;
		return await http.post(url, data);
	},
	/**
	 * 删除记录
	 * @param id 记录标识
	 * @returns 返回接口数据
	 */
	delete:async(id:number|string)=>{
		const url=`/v1/admin/ims/casepersonline/delete/${id}`;
		return await http.post(url);
	},
}