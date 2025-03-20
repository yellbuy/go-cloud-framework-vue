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
          <img src="./img/greed.png" alt=""></img>
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
          {field: 'address', title: '县（区）'},
          {field: 'address', title: '乡镇（街道）'},
          {field: 'address', title: '社区（村）'},
          {field: 'address', title: '姓名'},
          {field: 'address', title: '是否达标', align: 'center', slots: {default: 'imgDefault'}}
        ],
        data: [
          {id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc'},
          {id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou'},
          {id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai'},
          {id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc'},
          {id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai'},
          {id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc'},
          {id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc'},
          {id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc'},
          {id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai'},
          {id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc'},
          {id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc'},
          {id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc'},
          {id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai'},
          {id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc'},
          {id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc'},
          {id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc'},
          {id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai'},
          {id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc'},
          {id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc'},
          {id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc'}
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
  height: 100vh;
}
</style>