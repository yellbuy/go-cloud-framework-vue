<template>
	<div>
		<el-image
			:style="imgStyle"
			:initial-index="index"
			:src="imgList[index]"
			:preview-src-list="imgList"
			:title="title"
			v-for="(val, index) in imgList"
			:key="index"
			fit="cover"
		>
			<template #error>
				<div class="image-slot">
					<el-icon><icon-picture /></el-icon>
				</div>
			</template>
		</el-image>
	</div>
</template>

<script lang="ts">
import { indexOf } from 'lodash';
import { toRefs, reactive, watch, defineComponent, onUnmounted, onMounted, getCurrentInstance } from 'vue';
export default defineComponent({
	name: 'imageUrl',
	props: {
		ids: String,
		baseUrl: String,
		imgStyle: {
			default: 'width: 40px; height: 25px; border-radius: 5px',
		},
		title: {
			default: '点击查看大图预览',
		},
	},
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			imgList: [],
			staticBaseUrl: props.baseUrl,
		});
		if (!state.staticBaseUrl) {
			state.staticBaseUrl = import.meta.env.VITE_URL;
		}
		const loadPics = async (ids: String) => {
			state.imgList = [];
			if (ids) {
				if (ids.toString().indexOf(',') > -1) {
					const list = ids.split(',');
					list.forEach(function (val) {
						state.imgList.push(state.staticBaseUrl + val + '.png');
					});
				} else {
					state.imgList.push(state.staticBaseUrl + ids + '.png');
				}
			}
		};

		watch(
			() => props.ids,
			(newVal, oldVal) => {
				loadPics(props.ids);
			}
		);
		// 页面加载时
		onMounted(() => {
			console.log('页面加载');
			loadPics(props.ids);
		});
		return {
			...toRefs(state),
		};
	},
});
</script>
<style lang="scss" scoped>
.image-slot {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: var(--el-fill-color-light);
	color: var(--el-text-color-secondary);
	font-size: 30px;
}
.image-slot .el-icon {
	font-size: 30px;
}
</style>