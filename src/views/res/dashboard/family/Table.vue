<template>
  <div id="flareTarget">
    <div class="flare-container">
      <div class="target-content">
        <table>
          <thead>
          <th>序号</th>
          <th>县（区）</th>
          <th>乡镇（街道）</th>
          <th>社区（村）</th>
          <th>姓名</th>
          <th>是否达标</th>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableDataList"
              @click="onGoToLink(`/admin/dashboard/family/detail?index=${index}&areaCode=${areaCode}&areaName=${areaName}`)">
            <td>{{ index + 1 }}</td>
            <td>{{ item["县（区）"] }}</td>
            <td>{{ item["乡镇（街道）"] }}</td>
            <td>{{ item["社区"] }}</td>
            <td>{{ item["姓名"] }}</td>
            <td>
              <img v-if="item['是否达标'] == '否'" alt="" src="./img/red.png"/>
              <img v-if="item['是否达标'] == '是'" alt="" src="./img/green.png"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import "@/views/res/dashboard/component/scss/box.scss";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default {
  props: {
    tableDataList: Array,
    areaCode:"",
    areaName:"",
  },
  setup(props) {
    const state: any = reactive({})
    const router = useRouter();
    //导航链接
    const onGoToLink = (url: string) => {
      router.push(url)
    }
    return {
      ...toRefs(state),
      onGoToLink
    }
  }
}
</script>

<style lang='scss' scoped>
.target-content {
  max-height: 65rem; /* 或者你需要的任何高度 */
  overflow: auto;
  position: relative;
}

table {
  border-collapse: collapse;
  border: 0;
  margin: 0;
  width: 100%;
}

thead {
  background-color: rgba(3, 48, 107, 0.5);
  padding: 0.5rem;
  font-size: 1.0rem;
}

th {
  border: none;
  padding: 0.51rem;
  font-size: 1rem;
  border-collapse: collapse
}

tr {
  height: 3rem;
}

tr:hover {
  background-color: rgba(3, 48, 107, 0.5);
}

td {
  font-size: 1.0rem;
}
</style>