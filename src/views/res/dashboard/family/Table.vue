<template>
  <div id="flareTarget">
    <div class="flare-container">
      <vxe-grid :style="{
        '--vxe-ui-table-header-background-color': color,
        '--vxe-ui-table-footer-background-color': color,
        '--vxe-ui-table-border-color': color,
        '--vxe-ui-table-border-width': color,
        '--vxe-ui-font-color': fontColor,
        '--vxe-ui-table-header-font-color': fontColor,
        '--vxe-ui-table-footer-font-color': fontColor,
        '--vxe-table--layout-wrapper': fontColor
      }" v-bind="gridOptions">

        <template #imgDefault>
          <img alt="" src="./img/greed.png"></img>
        </template>

        <template #infoDefault="{ row }">
          <div class="label-ellipsis">{{ row.name }}</div>
          <div class="label-ellipsis">{{ row.age }}</div>
          <div class="label-ellipsis">{{ row.address }}</div>
        </template>
      </vxe-grid>
    </div>
  </div>
</template>

<script lang="ts">

import {reactive, toRefs} from "vue";

export default {
  setup() {
    const state: any = reactive({
      gridOptions: {
        border: true,
        maxHeight: '100%',
        rowConfig: {
          isHover: true
        },
        columns: [
          {type: 'seq', title: '序号'},
          {field: 'county', title: '县（区）'},
          {field: 'townsAndVillages', title: '乡镇（街道）'},
          {field: 'community', title: '社区（村）'},
          {field: 'name', title: '姓名'},
          {field: 'reachTheStandard', title: '是否达标', align: 'center', slots: {default: 'imgDefault'}}
        ],
        data: [
          {id: 10001, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10002, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10003, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10004, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10001, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10002, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10003, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10004, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10001, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10002, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10003, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10004, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10001, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10002, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10003, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10004, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10005, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10006, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10007, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
          {id: 10008, name: '张三', county: '金江', townsAndVillages: '大龙潭', community: '花城'},
        ]
      }
    })

    return {
      ...toRefs(state),
      color: "#140B54",
      fontColor: "#1A78AB"
    }
  }
}
</script>

<style lang='scss' scoped>
.flare-container {
  font-size: 200px !important;
}
</style>