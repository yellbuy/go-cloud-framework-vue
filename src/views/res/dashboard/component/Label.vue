<template>
  <div class="flareTarget">
    <div class="label">
      <label :style="{color:color}" style="font-size: 2.5rem">{{ title }}</label>
      <label :style="{color:color}">{{ text }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";

export default {
  props: {
    title: {},
    text: {},
    color: {}
  },
  setup() {
    const state: any = reactive({})
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang='scss' scoped>
.flareTarget {
  display: inline-block;
}

.label {
  background-image: url(./img/label_box.png);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
  display: inline-block;
  padding: 1rem 1rem;
  text-align: center;
  width:12rem;
  label {
    display: block;
    font-size: 1.5rem;
    color: #409eff;
  }
}
</style>