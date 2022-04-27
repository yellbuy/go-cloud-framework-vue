<template>
	<div class="layout-navbars-breadcrumb-user-news">
		<div class="head-box">
			<div class="head-box-title">{{ $t('message.user.newTitle') }}</div>
			<div class="head-box-btn" v-if="articleCount" @click="onAllReadClick">{{ $t('message.user.newBtn') }}</div>
		</div>
		<div class="content-box">
			<template v-if="articleCount">
				<div class="content-box-item" v-for="(v, index) in newsList" :key="index" >
					<template v-if="index<3">
						<div><el-link type="primary" underline @click="onArticleClick(v)">{{ v.Title }}</el-link></div>
						<div class="content-box-msg">
							{{ v.Description }}
						</div>
						<div class="content-box-time">{{ v.PublishTime }}</div>
					</template>
				</div>
				
			</template>
			<el-empty v-else :description="$t('message.user.newDesc')" ></el-empty>
		</div>
		<div class="foot-box" @click="onGotoArticleList" v-if="newsList.length > 0">{{ $t('message.user.newGo') }}</div>
		<articleDetail ref="articleDetailDlgRef" />
	</div>
</template>

<script lang="ts">
import { reactive, toRefs,ref,onMounted,getCurrentInstance,computed } from 'vue';
import { useRouter } from 'vue-router';
import articleDetail from '/@/views/cms/article/component/articleDetail.vue';
export default {
	name: 'layoutBreadcrumbUserNews',
	components: { articleDetail },
	setup(props,{ emit }) {
		const MAX_COUNT:number=3
		const router = useRouter();
		const { proxy } = getCurrentInstance() as any;
		const articleDetailDlgRef = ref();
		const state = reactive({
			newsList: [],
		});
		// 未读文章数
		const articleCount = computed(() => {
			return state.newsList.filter((val:any)=>{
				return !val.IsClick;
			}).length;
		});
		// 全部已读点击
		const onAllReadClick = async () => {
			const newsList=state.newsList.filter((val:any,index:number)=>{
				return index < MAX_COUNT;
			})
			const ids = newsList.map((val:any)=>{
				return val.Id;
			})
			const res = await proxy.$api.cms.article.updateIsClick(ids);
			if(res.errcode==0){
				//设置点击标记
				for(const val of newsList){
					val.IsClick = 1;
				}
				//过滤移除
				state.newsList = state.newsList.filter((val:any)=>{
					return !val.IsClick;
				})
				emit("onUpdateNews", state.newsList);
			}
			
			
		};
		// 前往通知中心点击
		const onGotoArticleList = () => {
			window.open(`/#/article/list/notice`,"_blank")
			//router.push(`/article/list`);
		};
		const getNewsList=async ()=>{
			//sortKind:3，按最新排序，isClick：0：未读
			const res=await proxy.$api.cms.article.getFrontEndList('notice',{isClick:0,pageSize:10})
			if(res.errcode==0){
				state.newsList=res.data;
				emit("onUpdateNews", res.data);
			}
		}
		const onArticleClick=async(item:any)=>{
			//移除当前项
			state.newsList = state.newsList.filter((val:any)=>{
				return val.Id!=item.Id;
			})
			emit("onUpdateNews", state.newsList);
			window.open(`/#/article/detail/${item.Id}`,"_blank")
			//router.push(`/article/detail/${item.Id}`);
		}
		// 页面加载时
		onMounted(async () => {
			await getNewsList();
		});
		return {
			articleCount,
			articleDetailDlgRef,
			onAllReadClick,
			onArticleClick,
			onGotoArticleList,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-user-news {
	.head-box {
		display: flex;
		border-bottom: 1px solid #ebeef5;
		box-sizing: border-box;
		color: #333333;
		justify-content: space-between;
		height: 35px;
		align-items: center;
		.head-box-btn {
			color: var(--color-primary);
			font-size: 13px;
			cursor: pointer;
			opacity: 0.8;
			&:hover {
				opacity: 1;
			}
		}
	}
	.content-box {
		font-size: 13px;
		
		.content-box-item {
			padding-top: 8px;
			&:not(last-of-type) {
				border-bottom: dotted 1px var(--el-color-info-light-7);
			}
			padding-bottom: 8px;
			.content-box-msg {
				color: #999999;
				margin-top: 5px;
				margin-bottom: 5px;
			}
			.content-box-time {
				color: #999999;
			}
		}
	}
	.foot-box {
		height: 35px;
		color: var(--color-primary);
		font-size: 13px;
		cursor: pointer;
		opacity: 0.8;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top: 1px solid #ebeef5;
		&:hover {
			opacity: 1;
		}
	}
	::v-deep(.el-empty__description p) {
		font-size: 13px;
	}
}
</style>
