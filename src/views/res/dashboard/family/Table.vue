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
          <tr v-for="item in TableData">
            <td>{{ item.id }}</td>
            <td>{{ item.district }}</td>
            <td>{{ item.village }}</td>
            <td>{{ item.community }}</td>
            <td>{{ item.name }}</td>
            <td>
              <img v-if="!item.standard" src="./img/red.png"/>
              <img v-if="item.standard" src="./img/green.png"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {reactive, toRefs} from "vue";

export default {
  setup() {
    const state: any = reactive({
      TableData: [
        {
          id: 1,
          district: "仁和区",
          village: "大龙潭彝族乡",
          community: "荤撒拉村",
          name: "邓*志",
          standard: false
        }
      ]
    })
    for (let i = 0; i < 60; i++) {
      state.TableData.push(
          {
            id: 1,
            district: "仁和区",
            village: "大龙潭彝族乡",
            community: "荤撒拉村",
            name: "邓*志",
            standard: (i % 3 != 0)
          }
      );
    }

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang='scss' scoped>

table {
  border-collapse: collapse;
  border: 0;
  margin: 0;
  width: 100%;
}

thead {
  background-color: rgba(3, 48, 107, 0.5);
  padding: 1rem;
  font-size: 1.8rem;
}

th {
  margin: 0;
  border: none;
  padding: 1rem;
  font-size: 1.8rem;
  border-collapse: collapse
}

tr:hover {
  background-color: rgba(3, 48, 107, 0.5);
}

td {
  font-size: 1.6rem;
}
</style>