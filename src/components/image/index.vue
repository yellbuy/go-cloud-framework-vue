<template>
	<div>
		<el-image :style="imgStyle" 
		:initial-index="index" :src="imgList[index]" :preview-src-list="imgList" :title="title" 
		v-for="(val,index) in imgList" :key="index"> </el-image>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive, defineComponent, onUnmounted, onMounted } from 'vue';
export default defineComponent({
	name: 'imageList',
	props:{
		ids:String,
		baseURL: '',
		imgStyle:{
			default:'width: 100px; margin-right:5px;height: 100px; border-radius: 5px'
		},
		title:{
            default: '点击查看大图预览'
        },
	},
	setup(props, { emit }) {
		const state = reactive({
			imgList:[],
			staticBaseUrl:props.baseUrl,
		});
		// 页面销毁时
		onMounted(() => {
			let staticBaseUrl=props.baseURL;
			if(!staticBaseUrl){
				staticBaseUrl=import.meta.env.VITE_URL
			}
			
			if(props.ids){
				state.imgList=[],
				request({
					url: '/v1/file/parse',
					method: 'get',
					params: {ids:props.ids},
				}).then((res)=>{
					if(res.errcode!=0){
						console.debug(res.errmsg)
					} else if(res.data.length){
						res.data.forEach(function(val){
							if(val.Savepath){
								state.imgList.push(staticBaseUrl+val.Savepath)
							}
						})
					}
				}).catch((err)=>{
					console.error(err)
				});
			}
		});
		return {
			...toRefs(state),
		};
	},
});
</script>
