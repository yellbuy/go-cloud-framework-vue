<template>
	<el-upload :action="`${baseApiUrl}${uploadUrl}`" list-type="picture-card"
		:headers="httpHeaders"
		:with-credentials="true"
		:on-success="onPicUploadSuccess" :file-list="getImageList" :limit="limit" :on-remove="onRemovePic"
		:on-preview="showPreviewImage" :before-upload="onBeforeImageUpload">
		<!-- <template #file>
			<el-image
				ref="imageRef"
				:src="url"
				show-progress
				:preview-src-list="srcList"
				fit="cover"
			/>
		</template> -->
		<template #default>
			<el-icon>
				<plus />
			</el-icon>
		</template>
	</el-upload>
	<!-- <el-image 
				ref="imageRef"
				:src="imagePreviewUrl"
				show-progress
				style="width: 10px; height: 10px"
				:preview-src-list="getImagePathList"
				fit="contain"
			/> -->
	<el-image-viewer v-if="isShowPreview"
			show-progress
			:initial-index="imagePreviewIndex"
			:url-list="getImagePathList"
			:title="title"
			@close="isShowPreview = false"
			:teleported="true"
			fit="contain"
			:z-index="10000"
		>
	</el-image-viewer>
</template>

<script lang="ts">
import { ElMessage, UploadFile, UploadFiles, UploadProps } from 'element-plus';
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, toRefs, watch } from 'vue';
export default defineComponent({
	name: 'imageUpload',
	props: {
		ids: {
			type:String,
			default:''
		},
		limit:{
			type:Number,
			default:9
		},
		title:'',
		baseUrl:'',
		uploadUrl:{
			type:String,
			default:'/common/v1/file/upload'
		},
		imgStyle: {
			default: 'width: 100px; margin-right:5px;height: 100px; border-radius: 5px',
		},
		title: {
			default: '点击查看大图预览',
		},
	},
	
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any;
		
		const state = reactive({
			httpHeaders:proxy.$getRequestHeaders(),
			staticBaseUrl: props.baseUrl,
			baseApiUrl: import.meta.env.VITE_API_URL,
			fileList: [],
			imgList: [],
			srcList : [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
],
			imgIds: props.ids,
			isShowPreview:false,
			uploadUrl:props.uploadUrl,
			imagePreviewUrl: '',
			imagePreviewIndex:0,
		});
		if (!state.staticBaseUrl) {
			state.staticBaseUrl = import.meta.env.VITE_URL;
		}
		watch(() => props.ids, (newVal, oldVal) => {
			console.log(`Message changed from ${oldVal} to ${newVal}`);
			state.imgIds=newVal;
			loadPics(newVal)
		});
		const loadPics = async (ids: String) => {
			state.fileList = [];
			console.log("ids:",ids,state.fileList)
			if (ids) {
				const res = await proxy.$api.common.file.parse({ ids });
				if (res.errcode == 0) {
					state.fileList = res.data||[];
					state.imgIds='';
					for(let val of state.fileList){
						if(!state.imgIds){
							state.imgIds=val.Id;
						} else {
							state.imgIds=state.imgIds+','+val.Id;
						}
					}
				}
			}
		};
		
		//	显示表格图片
		const showPreviewImage: UploadProps['onPreview'] = (uploadFile) => {
			console.log("showPreviewImage",uploadFile)
			state.imagePreviewIndex=0;
			for(const index in state.fileList){
				const val=state.fileList[index]
				if(val.Id==uploadFile.id){
					state.imagePreviewIndex=Number.parseInt(index)
					state.imagePreviewUrl=uploadFile.url
					state.isShowPreview=true;
					break;
				}
			}
			console.log("proxy.$refs.imageRef:",proxy.$refs.imageRef)
			// proxy.$refs.imageRef.showPreview()
		}

		const getImagePathList = computed(() => {
			console.log("state.fileList computed:", state.fileList)
			const list= state.fileList.map(val=>{ return state.staticBaseUrl + val.Savepath });
			return list;
		});

		const getImageList = computed(() => {
			console.log("state.fileList computed:", state.fileList)
			const list= state.fileList.map(val=>{ return {id:val.Id, url:state.staticBaseUrl + val.Savepath }});
			return list;
		});
		//	图片上传前
		const onBeforeImageUpload: UploadProps['beforeUpload'] = (rawFile) => {
			if (
				rawFile.type !== 'image/jpeg' &&
				rawFile.type !== 'image/jpg' &&
				rawFile.type !== 'image/png'
			) {
				ElMessage.error('图片格式错误，支持的图片格式：jpg，png');
				return false;
			} else if (rawFile.size / 1024 / 1024 > 10) {
				ElMessage.error('图片大小不能超过10MB!');
				return false;
			}
			state.httpHeaders=proxy.$getRequestHeaders()
			return true;
		};
		const onRemovePic= (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
			//debugger
			console.log('onRemovePic:',uploadFile,"uploadFiles:", uploadFiles)
			state.fileList=state.fileList.filter((val)=>val.Id != uploadFile.id)
			state.imgIds='';
			for(let val of state.fileList){
				if(!state.imgIds){
					state.imgIds=val.Id;
				} else {
					state.imgIds=state.imgIds+','+val.Id;
				}
			}
			emit('on-image-remove', uploadFile)
			emit('on-image-change', state.imgIds)
		}
		//图片上传成功
		const onPicUploadSuccess= (res: any) => {
			//debugger
			if(res.errcode){
				ElMessage.error(res.errmsg);
				return;
			}
			const file=res.data;
			const row = { Savepath:file.src, Id:file.id};
			state.fileList.push(row);
			if(!state.imgIds){
				state.imgIds=file.id;
			} else {
				state.imgIds=state.imgIds+','+file.id
			}
			console.log("onPicUploadSuccess：", state.imgIds, res.data)
			emit('on-image-change', state.imgIds,state.fileList)
			emit('on-upload-success', res.data,state.imgIds,state.fileList)
		}
		// 页面加载时
		onMounted(() => {
			loadPics(props.ids); 
		});
		return {
			getImageList,
			getImagePathList,
			showPreviewImage,
			onRemovePic,
			onPicUploadSuccess,
			onBeforeImageUpload,
			...toRefs(state),
		};
	},
});
</script>
