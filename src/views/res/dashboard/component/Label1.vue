<template>
  <div>
    <div class="label">
      <label>{{ title }}</label>
      <label :style="{color:color}" style="font-size: 1.5em">{{ text }}</label>
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

.label {
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
  display: inline-block;
  padding: 0.3em;
  text-align: center;

  label {
    margin-top: 0.5em;
    display: block;
    font-size: 0.8em;
    color: #409eff;
  }
}
</style>