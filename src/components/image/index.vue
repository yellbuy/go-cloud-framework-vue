<template>
	<div>
		<el-image :style="imgStyle" 
		:initial-index="index" :src="imgList[index]" :preview-src-list="imgList" :title="title" 
		v-for="(val,index) in imgList" :key="index"> </el-image>
	</div>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive,watch, defineComponent, onUnmounted, onMounted } from 'vue';
export default defineComponent({
	name: 'imageList',
	props:{
		ids:String,
		baseUrl: '',
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
			staticBaseUrl:props.baseUrl
		});
		if(!state.staticBaseUrl){
			state.staticBaseUrl=import.meta.env.VITE_URL
		}
		const loadPics=((ids:String)=>{
			state.imgList=[];
			if(ids){
				request({
					url: '/v1/file/parse',
					method: 'get',
					params: {ids:ids},
				}).then((res)=>{
					if(res.errcode!=0){
						console.debug(res.errmsg)
					} else if(res.data.length){
						res.data.forEach(function(val){
							if(val.Savepath){
								state.imgList.push(state.staticBaseUrl+val.Savepath)
							}
						})
					}
				}).catch((err)=>{
					console.error(err)
				});
			}
		});

		watch(()=>props.ids,(newVal, oldVal)=>{
			loadPics(props.ids);
		});
		// 页面加载时
		onMounted(() => {
			loadPics(props.ids);
		});
		return {
			...toRefs(state),
		};
	},
});
</script>
