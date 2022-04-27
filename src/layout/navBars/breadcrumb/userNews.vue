<template>
	<div class="layout-navbars-breadcrumb-user-news">
		<div class="head-box">
			<div class="head-box-title">{{ $t('message.user.newTitle') }}</div>
			<div class="head-box-btn" v-if="articleCount" @click="onAllReadClick">{{ $t('message.user.newBtn') }}</div>
		</div>
		<div class="content-box">
			<template v-if="articleCount">
				<div class="content-box-item" v-for="(v, k) in newsList" :key="k" >
					<template v-if="!v.IsClick">
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
		<div class="foot-box" @click="onGoToGiteeClick" v-if="newsList.length > 0">{{ $t('message.user.newGo') }}</div>
		<articleDetail ref="articleDetailDlgRef" />
	</div>
</template>

<script lang="ts">
import { reactive, toRefs,ref,onMounted,getCurrentInstance,computed } from 'vue';
import articleDetail from '/@/views/cms/article/component/articleDetail.vue';
export default {
	name: 'layoutBreadcrumbUserNews',
	components: { articleDetail },
	setup(props,{ emit }) {
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
			const ids = state.newsList.filter((val:any)=>{
				return !val.IsClick;
			}).map((val:any)=>{
				return val.Id;
			})
			const res = await proxy.$api.cms.article.updateIsClick(ids);
			if(res.errcode==0){
				state.newsList=[];
				emit("onUpdateNews", []);
			}
			
		};
		// 前往通知中心点击
		const onGoToGiteeClick = () => {
			window.open('https://gitee.com/lyt-top/vue-next-admin');
		};
		const getNewsList=async ()=>{
			//sortKind:3，按最新排序，isClick：0：未读
			const res=await proxy.$api.cms.article.getFrontEndList('notice',{isClick:0,pageSize:3})
			if(res.errcode==0){
				state.newsList=res.data;
				emit("onUpdateNews", res.data);
			}
		}
		const onArticleClick=async(item:any)=>{
			const res=await proxy.$api.cms.article.getById(item.Id)
			if(res.errcode==0){
				articleDetailDlgRef.value.openDialog(res.data);
				await getNewsList()
			}
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
			onGoToGiteeClick,
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
