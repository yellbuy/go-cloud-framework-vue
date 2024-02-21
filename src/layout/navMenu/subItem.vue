<template>
	<template v-for="val in chils">
		<template v-if="!val.meta.isHide">
			<el-sub-menu :index="val.meta.isDynamicPath || val.path" :key="val.key" v-if="val.children && val.children.length > 0">
				<template #title>
					<SvgIcon :name="val.meta.icon" :color="val.meta.color"/>
					<span>{{ $t(val.meta.title) }}</span>
				</template>
				<sub-item :chil="val.children" />
			</el-sub-menu>
			<el-menu-item :index="val.meta.isDynamicPath || val.path" :key="val.key" v-else>
				<template v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)">
					<SvgIcon :name="val.meta.icon" :color="val.meta.color"/>
					<span>{{ $t(val.meta.title) }}</span>
				</template>
				<template v-else>
					<!-- <a :href="val.meta.isLink" target="_blank" @click.prevent="onALinkClick(val)" rel="opener">
						<SvgIcon :name="val.meta.icon" :color="val.meta.color"/>
						{{ $t(val.meta.title) }}
					</a> -->
					<a :href="val.meta.isLink" target="_blank">
						<SvgIcon :name="val.meta.icon" :color="val.meta.color"/>
						{{ $t(val.meta.title) }}
					</a>
				</template>
			</el-menu-item>
		</template>
		
	</template>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import other from '/@/utils/other';
export default defineComponent({
	name: 'navMenuSubItem',
	props: {
		chil: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		// 获取父级菜单数据
		const chils = computed(() => {
			return props.chil;
		});
		// 打开外部链接
		const onALinkClick = (val: any) => {
			other.handleOpenLink(val);
		};
		return {
			onALinkClick,
			chils,
		};
	},
});
</script>
