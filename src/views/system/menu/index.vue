<template>
	<div class="system-menu-container">
		<el-card shadow="hover">
			<div class="system-menu-search mb15">
				<el-input size="small" placeholder="请输入菜单名称" style="max-width: 180px"> </el-input>
				<el-button size="small" type="primary" class="ml10">
					<el-icon>
						<Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="small" type="success" class="ml10" @click="onOpenAddMenu">
					<el-icon>
						<FolderAdd />
					</el-icon>
					新增菜单
				</el-button>
			</div>
			<el-table :data="menuTableData" style="width: 100%" row-key="path" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
				<el-table-column label="菜单名称" show-overflow-tooltip>
					<template #default="scope">
						<SvgIcon :name="scope.row.meta.icon" />
						<span class="ml10">{{ $t(scope.row.meta.title) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="path" label="路由路径" show-overflow-tooltip></el-table-column>
				<el-table-column label="组件路径" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ scope.row.component }}</span>
					</template>
				</el-table-column>
				<el-table-column label="权限标识" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ scope.row.meta.roles }}</span>
					</template>
				</el-table-column>
				<el-table-column label="排序" show-overflow-tooltip width="80">
					<template #default="scope">
						{{ scope.$index }}
					</template>
				</el-table-column>
				<el-table-column label="类型" show-overflow-tooltip width="80">
					<template #default="scope">
						<el-tag type="success" size="small">{{ scope.row.xx }}菜单</el-tag>
					</template>
				</el-table-column>
				<el-table-column :label="$t('message.action.operate')" :width="proxy.$calcWidth(160)">
					<template #default="scope">
						<el-button text bg type="primary" @click="onOpenAddMenu(scope.row)">新增</el-button>
						<el-button text bg type="primary" @click="onOpenEditMenu(scope.row)">修改</el-button>
						<el-button text bg type="danger" @click="onTabelRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<AddMenu ref="addMenuRef" />
		<EditMenu ref="editMenuRef" />
	</div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, computed } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import AddMenu from '/@/views/system/menu/component/addMenu.vue';
import EditMenu from '/@/views/system/menu/component/editMenu.vue';
export default {
	name: 'systemMenu',
	components: { AddMenu, EditMenu },
	setup() {
		const store = useStore();
		const addMenuRef = ref();
		const editMenuRef = ref();
		const state = reactive({});
		// 获取 vuex 中的路由
		const menuTableData = computed(() => {
			return store.state.routesList.routesList;
		});
		// 打开新增菜单弹窗
		const onOpenAddMenu = () => {
			addMenuRef.value.openDialog();
		};
		// 打开编辑菜单弹窗
		const onOpenEditMenu = (row: object) => {
			editMenuRef.value.openDialog(row);
		};
		// 删除当前行
		const onTabelRowDel = (row: object) => {
			ElMessageBox.confirm(`此操作将永久删除路由：${row.path}, 是否继续?`, '提示', {
				confirmButtonText: '删除',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					ElMessage.success('删除成功');
				})
				.catch(() => {});
		};
		return {
			addMenuRef,
			editMenuRef,
			onOpenAddMenu,
			onOpenEditMenu,
			menuTableData,
			onTabelRowDel,
			...toRefs(state),
		};
	},
};
</script>
