<template>
  <div id="flareTarget">
    <div id="label">
      <label :style="{color:color}" style="font-size: 5.5rem">{{ title }}</label>
      <label :style="{color:color}">{{ text }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import {reactive, toRefs} from "vue";

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
#flareTarget {
  margin: 0 10px;
  display: inline-block;
}

#label {
  background-image: url(./img/label_box.png);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
  display: inline-block;
  padding: 2rem 8rem;
  text-align: center;

  label {
    display: block;
    font-size: 2rem;
    color: #409eff;
  }
}
</style>