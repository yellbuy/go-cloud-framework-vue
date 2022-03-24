<template>
	<label :style="`margin-right:${marginRight}px`">
		<SvgIcon :name="checked?'fa fa-check-square':'fa fa-square'" :size="size" :color="checked?boxTrueColor:boxFalseColor"/>
		<span :style="`color:${checked?titleTrueColor:titleFalseColor};margin-left:${titleMarginLeft}px`">{{title}}</span>
	</label>
</template>

<script lang="ts">
import request from '/@/utils/request';
import { toRefs, reactive,watch, defineComponent, onUnmounted, onMounted } from 'vue';
export default defineComponent({
	name: 'checkTag',
	props:{
		checked:{
			default:false
		},
		size:{
			type:Number,
			default:12
		},
		
		title:{
            default: ''
        },
		boxStyle:{

		},
		boxTrueColor:{
			default:'#409EFF'
		},
		boxFalseColor:{
			default:'#c8c9cc'
		},
		titleTrueColor:{
			default:'#409EFF'
		},
		titleFalseColor:{
			default:'#303133'
		},
		titleStyle:{

		},
		titleMarginLeft:{
			default:5
		},
		marginRight:{
			default:20
		},

	},
	setup(props, { emit }) {
		const state = reactive({
		});
		return {
			...toRefs(state),
		};
	},
});
</script>
